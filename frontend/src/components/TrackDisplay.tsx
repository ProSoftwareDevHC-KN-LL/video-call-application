import VideoComponent from './VideoCallRoom/VideoComponent';
import AudioComponent from './VideoCallRoom/AudioComponent';
import ScreenShareComponent from './VideoCallRoom/ScreenShareComponent';

type TrackDisplayProps = {
    localTrack: any; // Adjust type as necessary
    participantName: string;
    remoteTracks: any[]; // Adjust type as necessary
};

function TrackDisplay({ localTrack, participantName, remoteTracks }: TrackDisplayProps) {
    return (
        <>
            {localTrack && (
                <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
            )}
            {remoteTracks.map((remoteTrack) => {
                if (remoteTrack.trackPublication.kind === "video") {
                    return (
                        <VideoComponent
                            key={remoteTrack.trackPublication.trackSid}
                            track={remoteTrack.trackPublication.videoTrack!}
                            participantIdentity={remoteTrack.participantIdentity}
                        />
                    );
                } else if (remoteTrack.trackPublication.kind === "audio") {
                    return (
                        <AudioComponent
                            key={remoteTrack.trackPublication.trackSid}
                            track={remoteTrack.trackPublication.audioTrack!}
                        />
                    );
                } else if (remoteTrack.trackPublication.kind === "screen") {
                    return (
                        <ScreenShareComponent
                            key={remoteTrack.trackPublication.trackSid}
                            track={remoteTrack.trackPublication.videoTrack!}
                        />
                    );
                }
                return null;
            })}
        </>
    );
}

export default TrackDisplay;