const RoomManager = require("../../classes/RoomManager.js")
async function OnPauseVideo(socket,data) {
    if(!data.roomID) return
    const room = RoomManager.findRoomByID(data.roomID)
    if(room) {
        room.broadcastEventToUsersExcept([socket], {
            type: "pause-video"
        })
    }
}

module.exports = OnPauseVideo