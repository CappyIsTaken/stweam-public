const RoomManager = require("../../classes/RoomManager.js")
async function OnPlayVideo(socket,data) {
    if(!data.roomID) return
    const room = RoomManager.findRoomByID(data.roomID)
    if(room) {
        room.broadcastEventToUsersExcept([socket], {
            type: "play-video"
        })
    }
}

module.exports = OnPlayVideo