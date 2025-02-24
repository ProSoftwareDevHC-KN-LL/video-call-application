import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import "./VideoComponent.css";
import { useEffect, useRef } from "react";

interface VideoComponentProps {
    track: LocalVideoTrack | RemoteVideoTrack;
    participantIdentity: string;
    local?: boolean;
}

function VideoComponent({ track, participantIdentity, local = false }: VideoComponentProps) {
    const videoElement = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }

        return () => {
            track.detach();
        };
    }, [track]);

    return (
        <div id={"camera-" + participantIdentity} className="video-container d-flex flex-column align-items-center">
            <div className="participant-data">
                <p className="text-white">{participantIdentity + (local ? " (You)" : "")}</p>
            </div>
            <video ref={videoElement} id={track.sid} className="w-100 h-100" />
        </div>
    );
}

export default VideoComponent;