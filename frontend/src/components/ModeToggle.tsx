import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

interface ModeToggleProps {
    sx?: object; // Optional styling prop
}

const ModeToggle: React.FC<ModeToggleProps> = ({ sx = {} }) => {
    const theme = useTheme();
    const { mode, toggleTheme } = useCustomTheme();

    return (
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                    ml: 1,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    ...sx,
                }}
            >
                {mode === 'dark' ? (
                    <Brightness7 sx={{ 
                        color: 'primary.main',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': { transform: 'rotate(180deg)' },
                    }} />
                ) : (
                    <Brightness4 sx={{ 
                        color: 'primary.main',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': { transform: 'rotate(180deg)' },
                    }} />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default ModeToggle; 