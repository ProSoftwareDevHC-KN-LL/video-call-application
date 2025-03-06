import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import {
    Mic,
    MicOff,
    Videocam,
    VideocamOff,
    ScreenShare,
    StopScreenShare,
    CallEnd,
} from '@mui/icons-material';

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
        <Box className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/80 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <Tooltip title={`${isMicrophoneEnabled ? 'Mute' : 'Unmute'} Microphone`}>
                    <IconButton
                        onClick={toggleMicrophone}
                        className={`${
                            isMicrophoneEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                        } text-white`}
                        size="large"
                    >
                        {isMicrophoneEnabled ? <Mic /> : <MicOff />}
                    </IconButton>
                </Tooltip>

                <Tooltip title={`${isCameraEnabled ? 'Turn Off' : 'Turn On'} Camera`}>
                    <IconButton
                        onClick={toggleCamera}
                        className={`${
                            isCameraEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                        } text-white`}
                        size="large"
                    >
                        {isCameraEnabled ? <Videocam /> : <VideocamOff />}
                    </IconButton>
                </Tooltip>

                <Tooltip title={`${isScreenSharing ? 'Stop Sharing' : 'Share Screen'}`}>
                    <IconButton
                        onClick={toggleScreenShare}
                        className={`${
                            isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
                        } text-white`}
                        size="large"
                    >
                        {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
                    </IconButton>
                </Tooltip>

                <div className="w-px h-8 bg-gray-600 mx-2" /> {/* Vertical divider */}

                <Tooltip title="Leave Room">
                    <IconButton
                        onClick={leaveRoom}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        size="large"
                    >
                        <CallEnd />
                    </IconButton>
                </Tooltip>
            </div>
        </Box>
    );
};

export default CallToolsTip;