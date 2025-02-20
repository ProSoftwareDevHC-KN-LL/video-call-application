import React, { useState } from 'react';
import { LocalVideoTrack } from 'livekit-client';
import VideoComponent from './VideoCallRoom/VideoComponent';

function DebugVideoComponent() {
    const [tracks, setTracks] = useState<LocalVideoTrack[]>([]);
    const participantIdentities = ["Participant 1", "Participant 2", "Participant 3"]; // Example identities

    // Function to create a mock LocalVideoTrack
    const createMockTrack = () => {
        const mockTrack = {
            attach: (element: HTMLVideoElement) => {
                // Simulate attaching the track to a video element
                console.log("Track attached to video element");
            },
            detach: () => {
                // Simulate detaching the track
                console.log("Track detached");
            },
            sid: Math.random().toString(36).substring(2, 15), // Random SID for the track
        } as LocalVideoTrack;

        return mockTrack;
    };

    const handleAttachTracks = () => {
        const newTracks = participantIdentities.map(() => createMockTrack());
        setTracks(newTracks); // Set the mock tracks
    };

    return (
        <div className="text-center mt-5">
            <h2>Debug Video Component</h2>
            <button className="btn btn-primary" onClick={handleAttachTracks}>
                Attach Video Tracks
            </button>
            <div className="video-grid mt-4">
                {tracks.map((track, index) => (
                    <VideoComponent 
                        key={track.sid} 
                        track={track} 
                        participantIdentity={participantIdentities[index]} 
                        local={true} 
                    />
                ))}
            </div>
        </div>
    );
}

export default DebugVideoComponent; 