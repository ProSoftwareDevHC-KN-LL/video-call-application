import VideoComponent from './VideoCallRoom/VideoComponent';
import AudioComponent from './VideoCallRoom/AudioComponent';

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
            {remoteTracks.map((remoteTrack) =>
                remoteTrack.trackPublication.kind === "video" ? (
                    <VideoComponent
                        key={remoteTrack.trackPublication.trackSid}
                        track={remoteTrack.trackPublication.videoTrack!}
                        participantIdentity={remoteTrack.participantIdentity}
                    />
                ) : (
                    <AudioComponent
                        key={remoteTrack.trackPublication.trackSid}
                        track={remoteTrack.trackPublication.audioTrack!}
                    />
                )
            )}
        </>
    );
}

export default TrackDisplay;