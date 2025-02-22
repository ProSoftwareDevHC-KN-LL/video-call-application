type CallToolsTipProps = {
    toggleCamera: () => Promise<void>;
    toggleMicrophone: () => Promise<void>;
    isCameraEnabled: boolean;
    isMicrophoneEnabled: boolean;
    leaveRoom: () => void;
    toggleScreenShare: () => Promise<void>;
    isScreenSharing: boolean;
};

const CallToolsTip: React.FC<CallToolsTipProps> = ({
    toggleCamera,
    toggleMicrophone,
    isCameraEnabled,
    isMicrophoneEnabled,
    leaveRoom,
    toggleScreenShare,
    isScreenSharing,
}) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="mb-2">
                <button onClick={toggleMicrophone} className="btn btn-secondary me-2">
                    {isMicrophoneEnabled ? 'Mute' : 'Unmute'} Microphone
                </button>
                <button onClick={toggleCamera} className="btn btn-secondary me-2">
                    {isCameraEnabled ? 'Turn Off' : 'Turn On'} Camera
                </button>
                <button onClick={toggleScreenShare} className="btn btn-secondary me-2">
                    {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                </button>
            </div>
            <button onClick={leaveRoom} className="btn btn-danger">
                Leave Room
            </button>
        </div>
    );
};

export default CallToolsTip;