import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate(); // Hook for navigation

    const handleJoinRoomClick = () => {
        navigate('/room'); // Navigate to the RoomComponent
    };

    const handleRecordPageClick = () => {
        navigate('/record'); // Navigate to the Record page
    };

    return (
        <div className="container homepage text-center mt-5">
            <h2>Welcome!</h2>
            <p>Manage your calls effectively</p>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <h5 className="card-title">New Call</h5>
                            <p className="card-text">Start an instant call</p>
                            <button
                                className="btn btn-light"
                                onClick={handleJoinRoomClick}
                            >
                                Join a Room
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card text-white bg-secondary">
                        <div className="card-body">
                            <h5 className="card-title">Recordings</h5>
                            <p className="card-text">Access past record</p>
                            <button
                                className="btn btn-light"
                                onClick={handleRecordPageClick}
                            >
                                Go to Record Page
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;