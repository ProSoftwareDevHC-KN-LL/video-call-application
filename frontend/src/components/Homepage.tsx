import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // New import

function Homepage() {
    const navigate = useNavigate(); // Hook for navigation

    const handleJoinRoomClick = () => {
        navigate('/room'); // Navigate to the RoomComponent
    };

    return (
        <div className="homepage">
            <Navbar /> {/* Include the Navbar component */}
            <div className="text-center mt-5">
                <button 
                    className="btn btn-primary btn-lg" 
                    onClick={handleJoinRoomClick}
                >
                    Join a Room
                </button>
            </div>
        </div>
    );
}

export default Homepage;