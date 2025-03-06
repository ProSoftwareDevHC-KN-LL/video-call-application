import { Box, Grid } from '@mui/material';
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

    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100vh - 140px)', // Adjust based on your navbar and controls height
                p: 2,
                bgcolor: 'background.default',
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    height: '100%',
                    position: 'relative',
                }}
            >
                {/* Screen Share Section */}
                {hasScreenShare && (
                    <Grid item xs={12} sx={{ mb: 2 }}>
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
                    </Grid>
                )}

                {/* Video Grid Section */}
                <Grid
                    container
                    item
                    spacing={2}
                    xs={12}
                    sx={{
                        flexGrow: 1,
                        height: hasScreenShare ? '40%' : '100%',
                    }}
                >
                    {/* Local Video */}
                    {localTrack && (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <VideoComponent
                                track={localTrack}
                                participantIdentity={participantName}
                                local={true}
                            />
                        </Grid>
                    )}

                    {/* Remote Videos and Audio */}
                    {remoteTracks.map((remoteTrack) => {
                        if (remoteTrack.trackPublication.kind === "video") {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={remoteTrack.trackPublication.trackSid}>
                                    <VideoComponent
                                        track={remoteTrack.trackPublication.videoTrack!}
                                        participantIdentity={remoteTrack.participantIdentity}
                                    />
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
            </Grid>
        </Box>
    );
}

export default TrackDisplay;