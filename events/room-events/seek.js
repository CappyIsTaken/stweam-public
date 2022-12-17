const RoomManager = require("../../classes/RoomManager.js")
async function OnSeek(socket,data) {
    if(!data.roomID) return
    const room = RoomManager.findRoomByID(data.roomID)
    if(room) {
        room.broadcastEventToUsersExcept([socket], {
            type: "seek",
            currentTime: data.currentTime
        })
    }
}

module.exports = OnSeek