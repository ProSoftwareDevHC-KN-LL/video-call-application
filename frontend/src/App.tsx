import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import RoomComponent from './components';
import Navbar from './components/Navbar';

function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-bs-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/room" element={<RoomComponent />} />
            </Routes>
        </>
    );
}

export default App;
