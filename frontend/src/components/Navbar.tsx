import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { VideoCall as VideoCallIcon } from '@mui/icons-material';
import ModeToggle from './ModeToggle';

function Navbar() {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VideoCallIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 32,
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            MOVEdigi Video Call
          </Typography>
        </Box>

        <ModeToggle />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;