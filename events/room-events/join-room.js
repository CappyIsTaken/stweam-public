const RoomManager = require("../../classes/RoomManager.js")
const Room = require("../../classes/Room.js")
const User = require("../../classes/User.js")
async function OnJoinRoom(socket,data) {
    const {roomID, username} = data

    if(username === "") {
        return socket.emit("room-events", {
            type: "join-room",
            success: false,
            message: "Username can't be empty!"
        })
    }

    if(!roomID) {
        return
    }
    const room = RoomManager.findRoomByID(roomID)


    if(room) {
        if(room.userExists(username)) {
            socket.emit("room-events", {
                type: "join-room",
                success: false,
                message: "User with this username is already inside the room!"
            })
            return
        }
        const user = new User(username, socket)
        room.addUser(user, false)
        socket.emit("room-events", {
            type: "join-room",
            success: true,
            owner: false,
            roomData: room.toJSON()
        })
        room.broadcastEventToUsersExcept([socket], {
            type: "user-joined",
            username: username
        })
    }
    else {
        const newRoom = new Room()
        newRoom.setRoomID(data.roomID)
        newRoom.addUser(new User(data.username, socket), true)
        socket.emit("room-events", {
            type: "join-room",
            success: true,
            owner: true,
            roomData: newRoom.toJSON()
        })
    }
    
}


module.exports = OnJoinRoom

