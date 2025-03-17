import React, { useState, useMemo } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';

interface VideoGridProps {
    localTrack: any;
    participantName: string;
    remoteTracks: any[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ localTrack, participantName, remoteTracks }) => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(0);
    
    // Calculate all video tracks (local + remote)
    const allVideoTracks = useMemo(() => {
        const videos = remoteTracks
            .filter(track => track.trackPublication.kind === "video")
            .map(track => ({
                track: track.trackPublication.videoTrack,
                participantIdentity: track.participantIdentity,
                isLocal: false
            }));

        if (localTrack) {
            videos.unshift({
                track: localTrack,
                participantIdentity: participantName,
                isLocal: true
            });
        }
        return videos;
    }, [localTrack, remoteTracks, participantName]);

    // Handle audio tracks separately
    const audioTracks = useMemo(() => 
        remoteTracks.filter(track => track.trackPublication.kind === "audio"),
        [remoteTracks]
    );

    const PARTICIPANTS_PER_PAGE = 12; // 4x3 grid
    const totalPages = Math.ceil(allVideoTracks.length / PARTICIPANTS_PER_PAGE);
    const currentTracks = allVideoTracks.slice(
        currentPage * PARTICIPANTS_PER_PAGE,
        (currentPage + 1) * PARTICIPANTS_PER_PAGE
    );

    // Enhanced grid layout calculation
    // const getGridLayout = (count: number) => {
    //     if (count <= 1) return { columns: 1, rows: 1 };
    //     if (count === 2) return { columns: 2, rows: 1 };
    //     if (count <= 4) return { columns: 2, rows: 2 };
    //     if (count <= 6) return { columns: 3, rows: 2 };
    //     if (count <= 9) return { columns: 3, rows: 3 };
    //     return { columns: 4, rows: 3 }; // Max 4x3 grid
    // };

    // const { columns, rows } = getGridLayout(currentTracks.length);

    // Calculate dimensions based on participant count
    const getParticipantDimensions = (count: number) => {
        if (count <= 1) return { width: '100%', height: '100%' };
        if (count === 2) return { width: '50%', height: '100%' };
        if (count <= 4) return { width: '50%', height: '50%' };
        if (count <= 6) return { width: '33.333%', height: '50%' };
        if (count <= 9) return { width: '33.333%', height: '33.333%' };
        return { width: '25%', height: '33.333%' };
    };

    const dimensions = getParticipantDimensions(currentTracks.length);

    return (
        <Box 
            sx={{ 
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
                    height: '100%',
                    gap: 1,
                    p: 1,
                }}
            >
                {currentTracks.map((track) => (
                    <Box
                        key={track.isLocal ? 'local' : track.participantIdentity}
                        sx={{
                            width: dimensions.width,
                            height: dimensions.height,
                            padding: 0.5,
                        }}
                    >
                        <VideoComponent
                            track={track.track}
                            participantIdentity={track.participantIdentity}
                            local={track.isLocal}
                        />
                    </Box>
                ))}
            </Box>

            {/* Audio Components */}
            {audioTracks.map(track => (
                <AudioComponent
                    key={track.trackPublication.trackSid}
                    track={track.trackPublication.audioTrack}
                />
            ))}

            {/* Navigation Buttons */}
            {totalPages > 1 && (
                <>
                    <IconButton
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'background.paper',
                            boxShadow: theme.shadows[4],
                            '&:hover': { bgcolor: 'action.hover' },
                            visibility: currentPage === 0 ? 'hidden' : 'visible',
                            zIndex: 2,
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>
                    <IconButton
                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={currentPage === totalPages - 1}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'background.paper',
                            boxShadow: theme.shadows[4],
                            '&:hover': { bgcolor: 'action.hover' },
                            visibility: currentPage === totalPages - 1 ? 'hidden' : 'visible',
                            zIndex: 2,
                        }}
                    >
                        <ChevronRight />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

export default VideoGrid; 