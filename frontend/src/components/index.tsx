import { useState } from 'react';
import { LocalVideoTrack,
        RemoteParticipant,
        RemoteTrack,
        RemoteTrackPublication,
        Room,
        RoomEvent
    } from "livekit-client";
import JoinRoomForm from './JoinRoomForm';
import RoomHeader from './VideoCallRoom/RoomHeader';
import TrackDisplay from './TrackDisplay';
import CallToolsTip from './VideoCallRoom/CallToolsTip';

type TrackInfo = {
    trackPublication: RemoteTrackPublication;
    participantIdentity: string;
};

// When running OpenVidu locally, leave these variables empty
// For other deployment type, configure them with correct URLs depending on your deployment
let APPLICATION_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
let LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
// configureUrls();

// function configureUrls() {
//     // If APPLICATION_SERVER_URL is not configured, use default value from OpenVidu Local deployment
//     if (!APPLICATION_SERVER_URL) {
//         if (window.location.hostname === "localhost") {
//             APPLICATION_SERVER_URL = "http://localhost:6080/";
//         } else {
//             APPLICATION_SERVER_URL = "https://" + window.location.hostname + ":6443/";
//         }
//     }

//     // If LIVEKIT_URL is not configured, use default value from OpenVidu Local deployment
//     if (!LIVEKIT_URL) {
//         if (window.location.hostname === "localhost") {
//             LIVEKIT_URL = "ws://localhost:7880/";
//         } else {
//             LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/";
//         }
//     }
// }

function RoomComponent() {
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);
    const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100));
    const [roomName, setRoomName] = useState("Room");
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    // Reset all media states
    const resetMediaStates = () => {
        setIsCameraEnabled(true);
        setIsMicrophoneEnabled(true);
        setIsScreenSharing(false);
    };

    // Toggle camera
    const toggleCamera = async () => {
        if (!room) return;
        try {
            await room.localParticipant.setCameraEnabled(!isCameraEnabled);
            setIsCameraEnabled(!isCameraEnabled);
        } catch (error) {
            console.error("Error toggling camera:", error);
            // Reset to actual state if toggle fails
            setIsCameraEnabled(room.localParticipant.isCameraEnabled);
        }
    };

    // Toggle microphone
    const toggleMicrophone = async () => {
        if (!room) return;
        try {
            await room.localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
            setIsMicrophoneEnabled(!isMicrophoneEnabled);
        } catch (error) {
            console.error("Error toggling microphone:", error);
            // Reset to actual state if toggle fails
            setIsMicrophoneEnabled(room.localParticipant.isMicrophoneEnabled);
        }
    };

    // Toggle screen share
    const toggleScreenShare = async () => {
        if (!room) return;
        try {
            await room.localParticipant.setScreenShareEnabled(!isScreenSharing);
            setIsScreenSharing(!isScreenSharing);
        } catch (error) {
            console.error("Error toggling screen share:", error);
            // Reset to actual state if toggle fails
            setIsScreenSharing(room.localParticipant.isScreenShareEnabled);
        }
    };

    async function joinRoom() {
        const room = new Room();
        
        // Reset states before connecting
        resetMediaStates();
        setRoom(room);

        room.on(RoomEvent.TrackSubscribed, (_track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
            setRemoteTracks((prev) => [
                ...prev,
                { trackPublication: publication, participantIdentity: participant.identity }
            ]);
        });

        room.on(RoomEvent.TrackUnsubscribed, (_track: RemoteTrack, publication: RemoteTrackPublication) => {
            setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
        });

        // Handle disconnection
        room.on(RoomEvent.Disconnected, () => {
            resetMediaStates();
            setRoom(undefined);
            setLocalTrack(undefined);
            setRemoteTracks([]);
        });

        try {
            const token = await getToken(roomName, participantName);
            await room.connect(LIVEKIT_URL, token);
            await room.localParticipant.enableCameraAndMicrophone();
            setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value?.videoTrack);
            
            // Sync states with actual device states
            setIsCameraEnabled(room.localParticipant.isCameraEnabled);
            setIsMicrophoneEnabled(room.localParticipant.isMicrophoneEnabled);
            setIsScreenSharing(room.localParticipant.isScreenShareEnabled);
        } catch (error) {
            console.log("There was an error connecting to the room:", (error as Error).message);
            await leaveRoom();
        }
    }

    async function leaveRoom() {
        if (room) {
            // Ensure all tracks are disabled before disconnecting
            try {
                if (isScreenSharing) {
                    await room.localParticipant.setScreenShareEnabled(false);
                }
                await room.localParticipant.setCameraEnabled(false);
                await room.localParticipant.setMicrophoneEnabled(false);
            } catch (error) {
                console.error("Error cleaning up tracks:", error);
            }
            
            await room.disconnect();
        }
        
        // Reset all states
        resetMediaStates();
        setRoom(undefined);
        setLocalTrack(undefined);
        setRemoteTracks([]);
    }

    async function getToken(roomName: string, participantName: string) {
        const response = await fetch(APPLICATION_SERVER_URL + "token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomName: roomName,
                participantName: participantName
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to get token: ${error.errorMessage}`);
        }

        const data = await response.json();
        return data.token;
    }

    return (
        <>
            {!room ? (
                <JoinRoomForm
                    participantName={participantName}
                    setParticipantName={setParticipantName}
                    roomName={roomName}
                    setRoomName={setRoomName}
                    joinRoom={joinRoom}
                />
            ) : (
                <div id="room">
                    <RoomHeader roomName={roomName} />
                    <div id="layout-container" className="video-grid d-flex flex-wrap justify-content-center">
                        <TrackDisplay
                            localTrack={localTrack}
                            participantName={participantName}
                            remoteTracks={remoteTracks}
                        />
                    </div>
                    <CallToolsTip
                        toggleCamera={toggleCamera}
                        toggleMicrophone={toggleMicrophone}
                        toggleScreenShare={toggleScreenShare}
                        isCameraEnabled={isCameraEnabled}
                        isMicrophoneEnabled={isMicrophoneEnabled}
                        isScreenSharing={isScreenSharing}
                        leaveRoom={leaveRoom}
                    />
                </div>
            )}
        </>
    );
}

export default RoomComponent;