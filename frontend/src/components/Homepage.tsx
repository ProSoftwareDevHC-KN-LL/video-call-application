import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate(); // Hook for navigation

    const handleJoinRoomClick = () => {
        navigate('/room'); // Navigate to the RoomComponent
    };

    return (
        <div className="homepage text-center mt-5">
            <h2>Join a Room</h2>
            <button 
                className="btn btn-primary btn-lg" 
                onClick={handleJoinRoomClick}
            >
                Join a Room
            </button>
        </div>
    );
}

export default Homepage;