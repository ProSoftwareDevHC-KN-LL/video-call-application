import React, { useState } from 'react';
import { LocalVideoTrack } from 'livekit-client';
import VideoComponent from './VideoCallRoom/VideoComponent';

function DebugVideoComponent() {
    const [track, setTrack] = useState<LocalVideoTrack | null>(null);
    const participantIdentity = "Test Participant"; // Example identity

    // Simulate attaching a video track for debugging
    const handleAttachTrack = () => {
        // Here you would normally get the track from your video call setup
        // For debugging, you can create a mock track or use a real one if available
        // setTrack(mockTrack); // Uncomment and replace with actual track
    };

    return (
        <div className="text-center mt-5">
            <h2>Debug Video Component</h2>
            <button className="btn btn-primary" onClick={handleAttachTrack}>
                Attach Video Track
            </button>
            {track && (
                <VideoComponent track={track} participantIdentity={participantIdentity} local={true} />
            )}
        </div>
    );
}

export default DebugVideoComponent; 