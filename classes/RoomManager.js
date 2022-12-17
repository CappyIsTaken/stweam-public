class RoomManager {
    static rooms = []

    static addRoom(room) {
        this.rooms.push(room)
    }

    static removeRoom(room) {
        this.rooms = this.rooms.filter(r => r != room)

    }

    
    static findRoomByID(roomID) {
        return this.rooms.find(r => r.id === roomID)
    }
    

    static roomExists(roomID) {
        return this.findRoomByID(roomID) !== undefined
    }
}

module.exports = RoomManager