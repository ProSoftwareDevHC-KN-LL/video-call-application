# Prerequisite
- One node/remote server available with floating IP address
- Docker and Docker compose installed
- Apache2 installed
- A fully qualified DNS


# Step-by-step to install the application
## Generate rsa ssh key
```
ssh-keygen -t rsa
```

## Clone git
```
git clone git@github.com:ProSoftwareDevHC-KN-LL/video-call-application.git -c core.sshCommand="ssh -i ~/.ssh/<private_key>"
```

## Run the docker-compose.yml file
```
cd video-call-application/
docker compose up -d
```

