import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import RoomComponent from './components';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/room" element={<RoomComponent />} />
        </Routes>
    );
}

export default App;
