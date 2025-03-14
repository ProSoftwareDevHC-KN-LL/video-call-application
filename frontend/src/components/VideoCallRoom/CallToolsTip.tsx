import React from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
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
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 32,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 2,
                padding: '16px 24px',
                borderRadius: '16px',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                boxShadow: theme.shadows[8],
                border: `1px solid ${theme.palette.divider}`,
                zIndex: 1000,
            }}
        >
            <Tooltip title={isMicrophoneEnabled ? 'Mute Microphone' : 'Unmute Microphone'}>
                <IconButton
                    onClick={toggleMicrophone}
                    sx={{
                        bgcolor: isMicrophoneEnabled ? 'action.selected' : 'error.main',
                        '&:hover': {
                            bgcolor: isMicrophoneEnabled ? 'action.focus' : 'error.dark',
                        },
                        color: 'white',
                    }}
                >
                    {isMicrophoneEnabled ? <Mic /> : <MicOff />}
                </IconButton>
            </Tooltip>

            <Tooltip title={isCameraEnabled ? 'Turn Off Camera' : 'Turn On Camera'}>
                <IconButton
                    onClick={toggleCamera}
                    sx={{
                        bgcolor: isCameraEnabled ? 'action.selected' : 'error.main',
                        '&:hover': {
                            bgcolor: isCameraEnabled ? 'action.focus' : 'error.dark',
                        },
                        color: 'white',
                    }}
                >
                    {isCameraEnabled ? <Videocam /> : <VideocamOff />}
                </IconButton>
            </Tooltip>

            <Tooltip title={isScreenSharing ? 'Stop Sharing Screen' : 'Share Screen'}>
                <IconButton
                    onClick={toggleScreenShare}
                    sx={{
                        bgcolor: isScreenSharing ? 'primary.main' : 'action.selected',
                        '&:hover': {
                            bgcolor: isScreenSharing ? 'primary.dark' : 'action.focus',
                        },
                        color: 'white',
                    }}
                >
                    {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
                </IconButton>
            </Tooltip>

            <Box sx={{ width: 1, height: 24, borderLeft: `1px solid ${theme.palette.divider}` }} />

            <Tooltip title="Leave Room">
                <IconButton
                    onClick={leaveRoom}
                    sx={{
                        bgcolor: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.dark',
                            transform: 'scale(1.1)',
                        },
                        color: 'white',
                        transition: 'transform 0.2s',
                    }}
                >
                    <CallEnd />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default CallToolsTip;