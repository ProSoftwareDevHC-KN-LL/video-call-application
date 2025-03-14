import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VideoComponent from './VideoCallRoom/VideoComponent';
import AudioComponent from './VideoCallRoom/AudioComponent';
import ScreenShareComponent from './VideoCallRoom/ScreenShareComponent';

type TrackDisplayProps = {
    localTrack: any;
    participantName: string;
    remoteTracks: any[];
};

function TrackDisplay({ localTrack, participantName, remoteTracks }: TrackDisplayProps) {
    const theme = useTheme();
    const hasScreenShare = remoteTracks.some(track => track.trackPublication.kind === "screen");
    const videoTracks = remoteTracks.filter(track => track.trackPublication.kind === "video");
    const totalParticipants = localTrack ? videoTracks.length + 1 : videoTracks.length;

    // Calculate grid columns based on participant count
    const getGridColumns = (count: number) => {
        if (count <= 1) return 12;
        if (count === 2) return 6;
        if (count <= 4) return 6;
        if (count <= 6) return 4;
        if (count <= 9) return 4;
        return 3;
    };

    const columns = getGridColumns(totalParticipants);

    return (
        <Container
            maxWidth={false}
            sx={{
                width: '100%',
                maxWidth: '1400px !important',
                height: 'calc(100vh - 140px)',
                px: { xs: 2, sm: 3, md: 4 },
                py: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            {/* Screen Share Section */}
            {hasScreenShare && (
                <Box sx={{ flex: '0 0 auto', maxHeight: '60vh' }}>
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

            {/* Video Grid */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <Grid container spacing={2}>
                    {/* Local Track */}
                    {localTrack && (
                        <Grid item xs={12} sm={columns}>
                            <Box sx={{ height: '100%', minHeight: 250 }}>
                                <VideoComponent
                                    track={localTrack}
                                    participantIdentity={participantName}
                                    local={true}
                                />
                            </Box>
                        </Grid>
                    )}

                    {/* Remote Tracks */}
                    {remoteTracks.map((remoteTrack) => {
                        if (remoteTrack.trackPublication.kind === "video") {
                            return (
                                <Grid item xs={12} sm={columns} key={remoteTrack.trackPublication.trackSid}>
                                    <Box sx={{ height: '100%', minHeight: 250 }}>
                                        <VideoComponent
                                            track={remoteTrack.trackPublication.videoTrack!}
                                            participantIdentity={remoteTrack.participantIdentity}
                                        />
                                    </Box>
                                </Grid>
                            );
                        } else if (remoteTrack.trackPublication.kind === "audio") {
                            return (
                                <AudioComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.audioTrack!}
                                />
                            );
                        }
                        return null;
                    })}
                </Grid>
            </Box>
        </Container>
    );
}

export default TrackDisplay;