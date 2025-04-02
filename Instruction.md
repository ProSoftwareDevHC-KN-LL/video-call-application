# Instruction for the MOVEdigi project E2E-encrypted video call

At commit 272f34d7e0b082d9da5e36a7377c9774a43c814f lies the initial state of the project. In this template, we have:
- frontend: a folder containing the frontend template for the application.
- backend: a folder containing the backend template for the application.
- backend/openvidu-local-dev: a local development version of the openvidu service

## Frontend
In this folder, there are some noticeable key points:
- livekit-client dependency is required
- function joinRoom, leaveRoom, getToken, as well as the original hooks (room, localTracks, remoteTracks) should be left untouched
    - joinRoom: Initialize a new Room object
        - This function should be called when user attempts to join a room.
        - User will join an existing room if the name matches, or create a new Room if no name found
    - leaveRoom: leave the current room
        - This function should be called when user attempts to leave a room
    - getToken: requests a token from the application server using the room name and participant name
        - required for joining a room
- AudioComponent.tsx should only be modified (not deleted)

## Backend
In this folder, there are some noticeable key points:
- livekit-server-sdk dependency is required
- index.js:
    - LEAVE THE EXISTING ENDPOINTS ALONE (POST /token, POST /livekit/webhook)
- environment variables (SERVER_PORT, LIVEKIT_API_KEY, LIVEKIT_API_SECRET) should be changed for security purpose (update these in .env file)

For further information, please ask.

## Openvidu Node
To install Openvidu:
- in the git folder, run
```
sudo sh openviud_install.sh
\# Answer all the questions prompted
```

- The Openvidu version used currently have a small error in /opt/openvidu/docker-compose.yaml. To fix this problem, do the following:
```
sudo su # Open sudo console
nano /opt/openvidu/docker-compose.yaml # fix the error
\# Go to the line containing MONGO_REPLICA_SET_KEY using Ctrl+W
\# Remove the part :mandatory behind the key
\# The finished version should look like this:
\# ...
\#         echo "${MONGO_REPLICA_SET_KEY}" > /data/mongo_data/replica.key &&
\# ...
```


