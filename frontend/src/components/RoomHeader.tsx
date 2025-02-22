type RoomHeaderProps = {
    roomName: string;
};

function RoomHeader({ roomName }: RoomHeaderProps) {
    return (
        <div id="room-header">
            <h2 id="room-title">{roomName}</h2>
        </div>
    );
}

export default RoomHeader;