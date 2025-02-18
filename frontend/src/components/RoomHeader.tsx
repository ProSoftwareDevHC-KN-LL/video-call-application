type RoomHeaderProps = {
    roomName: string;
    leaveRoom: () => void;
};

function RoomHeader({ roomName, leaveRoom }: RoomHeaderProps) {
    return (
        <div id="room-header">
            <h2 id="room-title">{roomName}</h2>
            <button className="btn btn-danger" id="leave-room-button" onClick={leaveRoom}>
                Leave Room
            </button>
        </div>
    );
}

export default RoomHeader;