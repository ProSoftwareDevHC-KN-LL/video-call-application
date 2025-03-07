import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PersonOutline } from "@mui/icons-material";

interface VideoComponentProps {
    track: LocalVideoTrack | RemoteVideoTrack;
    participantIdentity: string;
    local?: boolean;
}

function VideoComponent({ track, participantIdentity, local = false }: VideoComponentProps) {
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
                width: '100%',
                height: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: theme.shadows[8],
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    bgcolor: 'common.black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <video
                    ref={videoElement}
                    id={track.sid}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: local ? 'scaleX(-1)' : 'none',
                    }}
                />
                
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        zIndex: 1,
                    }}
                >
                    <PersonOutline sx={{ color: 'white', fontSize: 20 }} />
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'white',
                            fontWeight: 500,
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                            fontSize: '0.9rem',
                        }}
                    >
                        {participantIdentity}{local ? " (You)" : ""}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}

export default VideoComponent;