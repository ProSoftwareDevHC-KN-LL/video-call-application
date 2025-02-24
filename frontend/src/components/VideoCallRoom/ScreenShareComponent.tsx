import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";

interface ScreenShareComponentProps {
    track: LocalVideoTrack | RemoteVideoTrack;
}

function ScreenShareComponent({ track }: ScreenShareComponentProps) {
    const videoElement = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }

        return () => {
            track.detach();
        };
    }, [track]);

    return <video ref={videoElement} id={track.sid} className="w-300 h-300" />;
}

export default ScreenShareComponent;