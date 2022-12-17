const RoomManager = require("../../classes/RoomManager.js")
async function OnSyncVideoData(socket,data) {
    if(!data.roomID) return
    const room = RoomManager.findRoomByID(data.roomID)
    if(room && data.props) {
        const videoData = room.getVideoData()
        for(const key of Object.keys(data.props)) {
            if(key in videoData) {
                videoData[key] = data.props[key]
            }
        }
        room.broadcastEventToUsersExcept([socket], data)
    }
}

module.exports = OnSyncVideoData