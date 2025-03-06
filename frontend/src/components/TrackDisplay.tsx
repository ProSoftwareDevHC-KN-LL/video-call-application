import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VideoGrid from './VideoCallRoom/VideoGrid';
import ScreenShareComponent from './VideoCallRoom/ScreenShareComponent';

type TrackDisplayProps = {
    localTrack: any;
    participantName: string;
    remoteTracks: any[];
};

function TrackDisplay({ localTrack, participantName, remoteTracks }: TrackDisplayProps) {
    const theme = useTheme();
    const hasScreenShare = remoteTracks.some(track => track.trackPublication.kind === "screen");

    return (
        <Container
            maxWidth={false}
            sx={{
                width: '100%',
                maxWidth: '1400px !important', // Override default Container maxWidth
                height: 'calc(100vh - 140px)',
                px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
                py: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            {/* Screen Share Section */}
            {hasScreenShare && (
                <Box 
                    sx={{ 
                        flex: '0 0 auto',
                        maxHeight: '60vh',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: theme.shadows[4],
                    }}
                >
                    {remoteTracks.map((remoteTrack) => {
                        if (remoteTrack.trackPublication.kind === "screen") {
                            return (
                                <ScreenShareComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.videoTrack!}
                                />
                            );
                        }
                        return null;
                    })}
                </Box>
            )}

            {/* Video Grid Section */}
            <Box 
                sx={{ 
                    flex: 1,
                    minHeight: 0,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: theme.shadows[4],
                }}
            >
                <VideoGrid
                    localTrack={localTrack}
                    participantName={participantName}
                    remoteTracks={remoteTracks}
                />
            </Box>
        </Container>
    );
}

export default TrackDisplay;