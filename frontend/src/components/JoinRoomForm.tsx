import { useNavigate } from 'react-router-dom';

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

    const handleBackToHomepage = () => {
        navigate('/');
    };

    const isDarkMode = document.documentElement.getAttribute('data-bs-theme') === 'dark';

    return (
        <div id="join" className={`container text-center mt-5 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
            <div id="join-dialog" className={`p-4 rounded shadow ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
                <h2>Join a Video Room</h2>
                <form
                    onSubmit={(e) => {
                        joinRoom();
                        e.preventDefault();
                    }}
                >
                    <div className="mb-3 text-start">
                        <label htmlFor="participant-name" className="form-label">Participant</label>
                        <input
                            id="participant-name"
                            className="form-control"
                            type="text"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="room-name" className="form-label">Room</label>
                        <input
                            id="room-name"
                            className="form-control"
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className="btn btn-lg btn-success me-2"
                        type="submit"
                        disabled={!roomName || !participantName}
                    >
                        Join!
                    </button>
                    <button
                        className="btn btn-secondary btn-lg"
                        type="button"
                        onClick={handleBackToHomepage}
                    >
                        Back to Homepage
                    </button>
                </form>
            </div>
        </div>
    );
}

export default JoinRoomForm;