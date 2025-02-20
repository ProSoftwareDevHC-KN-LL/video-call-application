import React, { useEffect, useState } from 'react';
import VideoComponent from './VideoCallRoom/VideoComponent';
import AudioComponent from './VideoCallRoom/AudioComponent';
import { LocalVideoTrack } from 'livekit-client';

type TrackDisplayProps = {
    participantName: string;
    remoteTracks: any[]; // Adjust type as necessary
};

function TrackDisplay({ participantName, remoteTracks }: TrackDisplayProps) {
    const [localTracks, setLocalTracks] = useState<LocalVideoTrack[]>([]);

    // Function to create multiple mock LocalVideoTracks
    const createMockTracks = (count: number) => {
        const mockTracks = Array.from({ length: count }, () => {
            return {
                attach: (element: HTMLVideoElement) => {
                    console.log("Track attached to video element");
                },
                detach: () => {
                    console.log("Track detached");
                },
                sid: Math.random().toString(36).substring(2, 15), // Random SID for the track
            } as LocalVideoTrack;
        });
        return mockTracks;
    };

    // Set the local tracks with mock tracks for testing when the component mounts
    useEffect(() => {
        const mockTracks = createMockTracks(10); // Create 3 mock tracks
        setLocalTracks(mockTracks);
    }, []); // Empty dependency array to run only on mount

    return (
        <>
            {localTracks.map((track, index) => (
                <VideoComponent key={track.sid} track={track} participantIdentity={`Participant ${index + 1} (You)`} local={true} />
            ))}
            {remoteTracks.map((remoteTrack) =>
                remoteTrack.trackPublication.kind === "video" ? (
                    <div className='video-container-track'>
                        <VideoComponent
                            key={remoteTrack.trackPublication.trackSid}
                            track={remoteTrack.trackPublication.videoTrack!}
                            participantIdentity={remoteTrack.participantIdentity}
                        />
                    </div>

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