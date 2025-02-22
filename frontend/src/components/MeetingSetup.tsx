import { useEffect, useState } from 'react';
import { LocalVideoTrack } from 'livekit-client';

type MeetingSetupProps = {
    onSetupComplete: () => void;
    room: any; // Replace with the appropriate type for your room
};

const MeetingSetup: React.FC<MeetingSetupProps> = ({ onSetupComplete, room }) => {
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true);
    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);

    useEffect(() => {
        const setupTracks = async () => {
            const tracks = await room.localParticipant.createTracks({
                audio: true,
                video: true,
            });
            setLocalTrack(tracks[1]); // Assuming video is the second track
            await room.localParticipant.publishTrack(tracks[0]); // Publish audio
            await room.localParticipant.publishTrack(tracks[1]); // Publish video
        };

        setupTracks();
    }, [room]);

    const handleJoin = async () => {
        await room.localParticipant.enableCameraAndMicrophone();
        onSetupComplete();
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Camera Preview</h1>
            <p className="text-center">Make sure you look good!</p>
            <div className="text-center">
                {localTrack && (
                    <video
                        autoPlay
                        playsInline
                        ref={(video) => {
                            if (video) {
                                localTrack.attach(video);
                            }
                        }}
                        style={{ width: '100%', maxHeight: '400px', borderRadius: '10px' }}
                    />
                )}
            </div>
            <div className="mt-4">
                <h2>Meeting Details</h2>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p>Camera: {isCameraEnabled ? 'On' : 'Off'}</p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                        >
                            {isCameraEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
                        </button>
                    </div>
                    <div>
                        <p>Microphone: {isMicrophoneEnabled ? 'On' : 'Off'}</p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsMicrophoneEnabled(!isMicrophoneEnabled)}
                        >
                            {isMicrophoneEnabled ? 'Mute' : 'Unmute'}
                        </button>
                    </div>
                </div>
                <button className="btn btn-success mt-3" onClick={handleJoin}>
                    Join Meeting
                </button>
                <p className="text-center text-muted mt-2">
                    Do not worry, our team is super friendly!
                </p>
            </div>
        </div>
    );
};

export default MeetingSetup;