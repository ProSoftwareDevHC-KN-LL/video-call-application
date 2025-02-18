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
    return (
        <div id="join">
            <div id="join-dialog">
                <h2>Join a Video Room</h2>
                <form
                    onSubmit={(e) => {
                        joinRoom();
                        e.preventDefault();
                    }}
                >
                    <div>
                        <label htmlFor="participant-name">Participant</label>
                        <input
                            id="participant-name"
                            className="form-control"
                            type="text"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="room-name">Room</label>
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
                        className="btn btn-lg btn-success"
                        type="submit"
                        disabled={!roomName || !participantName}
                    >
                        Join!
                    </button>
                </form>
            </div>
        </div>
    );
}

export default JoinRoomForm;