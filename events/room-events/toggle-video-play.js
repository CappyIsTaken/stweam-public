const RoomManager = require("../../classes/RoomManager.js")
async function OnToggle(socket,data) {
    if(!data.roomID) return
    const room = RoomManager.findRoomByID(data.roomID)
    if(room) {
        room.broadcastEventToUsersExcept([socket], data)
    }
}

module.exports = OnToggle