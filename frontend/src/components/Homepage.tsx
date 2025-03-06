import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
  Grid,
  Paper,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  // PlayCircle as PlayCircleIcon,
} from '@mui/icons-material';

function Homepage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleJoinRoomClick = () => {
    navigate('/room');
  };

  // const handleRecordPageClick = () => {
  //     navigate('/record'); // Navigate to the Record page
  // };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2,
            }}
          >
            Welcome to MOVEdigi
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            Connect with anyone, anywhere through high-quality video calls
          </Typography>
        </Box>

        {/* Cards Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={theme.palette.mode === 'dark' ? 4 : 1}
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #1e293b 30%, #0f172a 90%)'
                    : 'linear-gradient(45deg, #f8fafc 30%, #ffffff 90%)',
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                  <VideoCallIcon
                    sx={{
                      fontSize: 60,
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h4" component="h2" gutterBottom>
                    Start a New Call
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 4 }}
                  >
                    Begin a high-quality video conference with just one click.
                    Perfect for meetings, catch-ups, and collaboration.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleJoinRoomClick}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderRadius: '12px',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                        : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      '&:hover': {
                        background: theme.palette.mode === 'dark'
                          ? 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)'
                          : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                      },
                    }}
                  >
                    Join Room
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Paper
              elevation={theme.palette.mode === 'dark' ? 4 : 1}
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #1e293b 30%, #0f172a 90%)'
                    : 'linear-gradient(45deg, #f8fafc 30%, #ffffff 90%)',
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                  <PlayCircleIcon
                    sx={{
                      fontSize: 60,
                      color: theme.palette.secondary.main,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h4" component="h2" gutterBottom>
                    View Recordings
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 4 }}
                  >
                    Access your past recordings and review important meetings
                    at your convenience.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => navigate('/record')}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderRadius: '12px',
                    }}
                  >
                    View Records
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
}

export default Homepage;