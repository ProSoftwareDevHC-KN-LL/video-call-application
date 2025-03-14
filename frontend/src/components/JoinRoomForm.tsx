import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    useTheme,
} from '@mui/material';
import { VideoCall as VideoCallIcon, ArrowBack } from '@mui/icons-material';

type JoinRoomFormProps = {
    participantName: string;
    setParticipantName: (name: string) => void;
    roomName: string;
    setRoomName: (name: string) => void;
    joinRoom: () => void;
};

function JoinRoomForm({
    participantName,
    setParticipantName,
    roomName,
    setRoomName,
    joinRoom,
}: JoinRoomFormProps) {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleBackToHomepage = () => {
        navigate('/');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        joinRoom();
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper
                elevation={theme.palette.mode === 'dark' ? 4 : 1}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #1e293b 30%, #0f172a 90%)'
                        : 'linear-gradient(45deg, #f8fafc 30%, #ffffff 90%)',
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <VideoCallIcon
                            sx={{
                                fontSize: 48,
                                color: theme.palette.primary.main,
                                mb: 2,
                            }}
                        />
                        <Typography variant="h4" component="h1" gutterBottom>
                            Join a Video Room
                        </Typography>
                    </Box>

                    <TextField
                        fullWidth
                        label="Participant Name"
                        variant="outlined"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Room Name"
                        variant="outlined"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                        }}
                    />

                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={!roomName || !participantName}
                            fullWidth
                            sx={{
                                py: 1.5,
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                                    : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                            }}
                        >
                            Join Room
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleBackToHomepage}
                            startIcon={<ArrowBack />}
                            fullWidth
                            sx={{ py: 1.5 }}
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default JoinRoomForm;