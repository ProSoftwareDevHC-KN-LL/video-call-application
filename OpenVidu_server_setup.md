#help #study 
# Prerequisite
- One node/remote server available with floating IP address
- A fully qualified DNS


# Step-by-step to install the OpenVidu service
## Generate rsa ssh key
```
ssh-keygen -t rsa
```

## Clone git
```
git clone git@github.com:ProSoftwareDevHC-KN-LL/video-call-application.git -c core.sshCommand="ssh -i ~/.ssh/<private_key>"
```

## Run the application
### Change to sudo mode
```
sudo su 
```

### Allow firewall
```
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 443/udp
ufw allow 50000:60000/udp
ufw enable
```

### Modification to the docker-compose 
```
nano docker-compose.yaml
```
Find the line `MONGO_REPLICA_SET_KEY`
Remove the part `:?mandatory`

### Run the application
```
systemctl start openvidu
```

## After-run checkup
Check out if the <domain_name> is available. There should be the default OpenVidu app running. 

# Generated keys
Available in `/opt/openvidu/config/openvidu.env`

