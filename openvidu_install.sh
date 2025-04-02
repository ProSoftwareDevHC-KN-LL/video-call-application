#!/bin/sh
# Docker & Docker Compose will need to be installed on the machine
set -eu
export DOCKER_VERSION="${DOCKER_VERSION:-27.3.1}"
export DOCKER_COMPOSE_VERSION="${DOCKER_COMPOSE_VERSION:-v2.29.7}"
export OPENVIDU_VERSION="${OPENVIDU_VERSION:-3.0.0}"
export INSTALLER_IMAGE="${INSTALLER_IMAGE:-docker.io/openvidu/openvidu-installer:${OPENVIDU_VERSION}}"
export MINIO_SERVER_IMAGE="${MINIO_SERVER_IMAGE:-docker.io/bitnami/minio:2024.10.13-debian-12-r1}"
export MINIO_CLIENT_IMAGE="${MINIO_CLIENT_IMAGE:-docker.io/minio/mc:RELEASE.2024-10-08T09-37-26Z}"
export MONGO_SERVER_IMAGE="${MONGO_SERVER_IMAGE:-docker.io/mongo:7.0.15}"
export REDIS_SERVER_IMAGE="${REDIS_SERVER_IMAGE:-docker.io/redis:7.4.1-alpine}"
export BUSYBOX_IMAGE="${BUSYBOX_IMAGE:-docker.io/busybox:1.37.0}"
export CADDY_SERVER_IMAGE="${CADDY_SERVER_IMAGE:-docker.io/openvidu/openvidu-caddy:${OPENVIDU_VERSION}}"
export CADDY_SERVER_PRO_IMAGE="${CADDY_SERVER_PRO_IMAGE:-docker.io/openvidu/openvidu-pro-caddy:${OPENVIDU_VERSION}}"
export OPENVIDU_OPERATOR_IMAGE="${OPENVIDU_OPERATOR_IMAGE:-docker.io/openvidu/openvidu-operator:${OPENVIDU_VERSION}}"
export OPENVIDU_SERVER_PRO_IMAGE="${OPENVIDU_SERVER_PRO_IMAGE:-docker.io/openvidu/openvidu-server-pro:${OPENVIDU_VERSION}}"
export OPENVIDU_SERVER_IMAGE="${OPENVIDU_SERVER_IMAGE:-docker.io/openvidu/openvidu-server:${OPENVIDU_VERSION}}"
export OPENVIDU_CALL_SERVER_IMAGE="${OPENVIDU_CALL_SERVER_IMAGE:-docker.io/openvidu/openvidu-call:${OPENVIDU_VERSION}}"
export OPENVIDU_DASHBOARD_PRO_IMAGE="${OPENVIDU_DASHBOARD_PRO_IMAGE:-docker.io/openvidu/openvidu-pro-dashboard:${OPENVIDU_VERSION}}"
export OPENVIDU_DASHBOARD_IMAGE="${OPENVIDU_DASHBOARD_IMAGE:-docker.io/openvidu/openvidu-dashboard:${OPENVIDU_VERSION}}"
export OPENVIDU_V2COMPATIBILITY_IMAGE="${OPENVIDU_V2COMPATIBILITY_IMAGE:-docker.io/openvidu/openvidu-v2compatibility:${OPENVIDU_VERSION}}"
export LIVEKIT_INGRESS_SERVER_IMAGE="${LIVEKIT_INGRESS_SERVER_IMAGE:-docker.io/livekit/ingress:v1.4.2}"
export LIVEKIT_EGRESS_SERVER_IMAGE="${LIVEKIT_EGRESS_SERVER_IMAGE:-docker.io/livekit/egress:v1.8.4}"
export PROMETHEUS_IMAGE="${PROMETHEUS_IMAGE:-docker.io/prom/prometheus:v2.55.0}"
export PROMTAIL_IMAGE="${PROMTAIL_IMAGE:-docker.io/grafana/promtail:3.2.1}"
export LOKI_IMAGE="${LOKI_IMAGE:-docker.io/grafana/loki:3.2.1}"
export MIMIR_IMAGE="${MIMIR_IMAGE:-docker.io/bitnami/grafana-mimir:2.14.1}"
export GRAFANA_IMAGE="${GRAFANA_IMAGE:-docker.io/grafana/grafana:11.3.0}"

wait_for_docker() {
    echo "Waiting for Docker to start..."

    # Set a countdown (in seconds)
    COUNTDOWN=60

    while [ "$COUNTDOWN" -gt 0 ]; do
        if docker info >/dev/null 2>&1; then
            echo "Docker started successfully."
            break
        else
            # Reduce the countdown by 1 each iteration.
            COUNTDOWN=$(( COUNTDOWN - 1 ))

            if [ "$COUNTDOWN" -eq 0 ]; then
                echo "ERROR: Docker did not start within the allocated time."
                break
            fi

            sleep 1
        fi
    done
}

# Check if executing as root
if [ "$(id -u)" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

if ! command -v docker > /dev/null 2>&1
then
  curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
  sh /tmp/get-docker.sh --version "${DOCKER_VERSION}" || { echo "Can't install Docker automatically. Install it manually and run this script again"; exit 1; }
else
    echo "Docker already installed. Check you have the latest version for best compatibility"
fi

if ! command -v docker-compose > /dev/null 2>&1
then
  TIME_LIMIT_SECONDS=20
  START_TIME=$(awk 'BEGIN{srand(); print srand()}')
  while true
  do
    CURRENT_TIME=$(awk 'BEGIN{srand(); print srand()}')
    if [ $((CURRENT_TIME-START_TIME)) -gt $TIME_LIMIT_SECONDS ]; then
      echo "Error downloading docker-compose. Could not download it in $TIME_LIMIT_SECONDS seconds"
      rm -rf /usr/local/bin/docker-compose
      exit 1
    fi
    STATUS_RECEIVED=$(curl --retry 5 --retry-max-time 40 --write-out "%{http_code}\n" -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose)
    CURL_EXIT_CODE=$?
    if [ $CURL_EXIT_CODE -ne 0 ]; then
      echo "Error downloading docker-compose. curl failed with exit code $CURL_EXIT_CODE. There are still $((TIME_LIMIT_SECONDS - (CURRENT_TIME - START_TIME))) seconds left to retry..."
      rm -rf /usr/local/bin/docker-compose
      sleep 2
      continue
    fi
    if [ "${STATUS_RECEIVED}" -ne "200" ]; then
      echo "Error downloading docker-compose. Received HTTP status code $STATUS_RECEIVED. There are still $((TIME_LIMIT_SECONDS - (CURRENT_TIME - START_TIME))) seconds left to retry..."
      rm -rf /usr/local/bin/docker-compose
      sleep 2
      continue
    fi
    echo "Success downloading docker-compose"
    chmod 755 /usr/local/bin/docker-compose
    break
  done

  # Create a symbolic link to docker-compose in the Docker CLI plugins directory
  # so docker compose can be used also
  mkdir -p /usr/local/lib/docker/cli-plugins
  ln -s /usr/local/bin/docker-compose /usr/local/lib/docker/cli-plugins/docker-compose
else
  echo "Docker Compose already installed. Check you have the latest version for best compatibility"
fi

# Restart Docker and wait for it to start
systemctl enable docker
systemctl stop docker
systemctl start docker
wait_for_docker

# Create random temp directory
TMP_DIR=$(mktemp -d)
docker pull "${INSTALLER_IMAGE}"

# Generate installation scripts
COMMON_DOCKER_OPTIONS="--network=host -v ${TMP_DIR}:/output \
    -e OPENVIDU_VERSION=$OPENVIDU_VERSION \
    -e CADDY_SERVER_IMAGE=$CADDY_SERVER_IMAGE \
    -e CADDY_SERVER_PRO_IMAGE=$CADDY_SERVER_PRO_IMAGE \
    -e MINIO_SERVER_IMAGE=$MINIO_SERVER_IMAGE \
    -e MINIO_CLIENT_IMAGE=$MINIO_CLIENT_IMAGE \
    -e MONGO_SERVER_IMAGE=$MONGO_SERVER_IMAGE \
    -e REDIS_SERVER_IMAGE=$REDIS_SERVER_IMAGE \
    -e BUSYBOX_IMAGE=$BUSYBOX_IMAGE \
    -e OPENVIDU_OPERATOR_IMAGE=$OPENVIDU_OPERATOR_IMAGE \
    -e OPENVIDU_SERVER_PRO_IMAGE=$OPENVIDU_SERVER_PRO_IMAGE \
    -e OPENVIDU_SERVER_IMAGE=$OPENVIDU_SERVER_IMAGE \
    -e OPENVIDU_CALL_SERVER_IMAGE=$OPENVIDU_CALL_SERVER_IMAGE \
    -e OPENVIDU_DASHBOARD_PRO_IMAGE=$OPENVIDU_DASHBOARD_PRO_IMAGE \
    -e OPENVIDU_DASHBOARD_IMAGE=$OPENVIDU_DASHBOARD_IMAGE \
    -e OPENVIDU_V2COMPATIBILITY_IMAGE=$OPENVIDU_V2COMPATIBILITY_IMAGE \
    -e LIVEKIT_INGRESS_SERVER_IMAGE=$LIVEKIT_INGRESS_SERVER_IMAGE \
    -e LIVEKIT_EGRESS_SERVER_IMAGE=$LIVEKIT_EGRESS_SERVER_IMAGE \
    -e PROMETHEUS_IMAGE=$PROMETHEUS_IMAGE \
    -e PROMTAIL_IMAGE=$PROMTAIL_IMAGE \
    -e LOKI_IMAGE=$LOKI_IMAGE \
    -e MIMIR_IMAGE=$MIMIR_IMAGE \
    -e GRAFANA_IMAGE=$GRAFANA_IMAGE \
    ${INSTALLER_IMAGE} \
    --deployment-type=single_node \
    --install \
    $*"

INTERACTIVE_MODE=true
for arg in "$@"; do
  if [ "$arg" = "--no-tty" ]; then
    INTERACTIVE_MODE=false;
    break
  fi
done

if [ "$INTERACTIVE_MODE" = true ]; then
  docker run -it ${COMMON_DOCKER_OPTIONS} > /dev/tty
else
  docker run -i ${COMMON_DOCKER_OPTIONS}
fi

cd "$TMP_DIR/installation-scripts/openvidu/"
chmod +x install.sh
./install.sh

cat finish-message.txt
echo
