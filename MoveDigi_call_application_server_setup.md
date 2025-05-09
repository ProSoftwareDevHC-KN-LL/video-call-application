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

## Add .env file to backend and frontend
In backend
```
nano ./backend/.env
```

The backend should contain:
```
SERVER_PORT=6080
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=<OVPENVIDU_SERVER_URL>
MONGODB_URI=
```

In frontend
```
nano ./frontend/.env
```

The frontend should contain
```
VITE_APP_SERVER_URL=<BACKEND_URL>
VITE_LIVEKIT_URL=<OPENVIDU_SERVER_URL>
```

## Install Apache server
Update the system
```
sudo apt update
```
Install Apache
```
sudo apt install apache2
```
Allow http and https
```
sudo ufw allow 'Apache Full'
```

## Secure Apache server with Letsencrypt
Follow this [link](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu)

## Configure Apache for reverse proxy
Enable `proxy` and `proxy_http`
```
sudo a2enmod proxy proxy_http
```

Assuming that a https-activated apache server is running with a fully qualified DNS

Add to the configuration file for the domain at `/etc/apache2/site-available/<domain-name>-le-ssl.conf`
```
ProxyPass /backend http://localhost:6080
ProxyPassReverse /backend http://localhost:6080

ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/
```

## Run the docker-compose.yml file
```
cd video-call-application/
docker compose up -d
```

