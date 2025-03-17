import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import RoomComponent from './components';
import RecordPage from './components/RecordPage';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

function App() {
    // const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/room" element={<RoomComponent />} />
                <Route path="/record" element={<RecordPage />} />
            </Routes>
        </Box>
    );
}

export default App;
