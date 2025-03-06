import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";
import { Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ScreenShareComponentProps {
    track: LocalVideoTrack | RemoteVideoTrack;
}

function ScreenShareComponent({ track }: ScreenShareComponentProps) {
    const videoElement = useRef<HTMLVideoElement | null>(null);
    const theme = useTheme();

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }

        return () => {
            track.detach();
        };
    }, [track]);

    return (
        <Paper
            elevation={theme.palette.mode === 'dark' ? 4 : 1}
            sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                border: `2px solid ${theme.palette.primary.main}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: theme.shadows[8],
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: 400,
                    bgcolor: 'common.black',
                }}
            >
                <video
                    ref={videoElement}
                    id={track.sid}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </Box>
        </Paper>
    );
}

export default ScreenShareComponent;