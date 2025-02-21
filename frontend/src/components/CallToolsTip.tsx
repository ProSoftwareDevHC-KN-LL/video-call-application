import React from 'react';

type CallToolsTipProps = {
    toggleCamera: () => Promise<void>;
    toggleMicrophone: () => Promise<void>;
    isCameraEnabled: boolean;
    isMicrophoneEnabled: boolean;
};

const CallToolsTip: React.FC<CallToolsTipProps> = ({
    toggleCamera,
    toggleMicrophone,
    isCameraEnabled,
    isMicrophoneEnabled,
}) => {
    return (
        <div className="call-tools">
            <button onClick={toggleMicrophone} className="btn btn-secondary">
                {isMicrophoneEnabled ? 'Mute' : 'Unmute'} Microphone
            </button>
            <button onClick={toggleCamera} className="btn btn-secondary">
                {isCameraEnabled ? 'Turn Off' : 'Turn On'} Camera
            </button>
        </div>
    );
};

export default CallToolsTip; 