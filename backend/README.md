# Important

The folder openvidu-local-deployment is meant to be a local development version ONLY. It should not be running as the final deployment service due to security reasons.

For the deployment-ready version, please read more at [OpenVidu Single Node Installation: On-premises](https://openvidu.io/latest/docs/self-hosting/single-node/on-premises/install/)

# Basic Node

Basic server application built for Node.js with Express. It internally uses [livekit-server-sdk-js](https://docs.livekit.io/server-sdk-js/).

For further information, check the [tutorial documentation](https://livekit-tutorials.openvidu.io/tutorials/application-server/node/).

## Prerequisites

-   [Node](https://nodejs.org/en/download)

## Run

1. Download repository

```bash
git clone https://github.com/OpenVidu/openvidu-livekit-tutorials.git
cd openvidu-livekit-tutorials/application-server/node
```

2. Install dependencies

```bash
npm install
```

3. Run the application

```bash
npm start
```