const RoomManager = require("./RoomManager.js")
const VideoData = require("./VideoData.js")
module.exports = class Room {
    
    constructor() {
        this.id = ""
        this.users = []
        this.owners = []
        this.videoData = new VideoData()
        RoomManager.addRoom(this)
    }

    userExists(username) {
        return this.users.find(x => x.username === username)
    }

    broadcastEventToUsers(data) {
        for(const user of this.users) {
            user.socket.emit("room-events", data)
        }
    }

    broadcastEventToUsersExcept(socketArray, data) {
        const broadcasted = this.users.filter(x => !socketArray.includes(x.socket))
        for(const user of broadcasted) {
            user.socket.emit("room-events", data)
        }
    }


    setRoomID(roomID) {
        this.id = roomID
    }

    addUser(user, isOwner) {
        user.setRoom(this)
        this.users.push(user)
        if(isOwner) {
            this.owners.push(user)
        }
    }

    getUsers() {
        return this.users
    }

    toJSON() {
        return {
            users: this.users.map(x => {
                return {username: x.username}
            }),
            owners: this.owners.map(x => {
                return {username: x.username}
            }),
            roomID: this.id,
            videoData: this.videoData.toJSON()
        }
    }

    getOwner() {
        return this.users.find(u => u.isRoomOwner === true)
    }

    removeUser(user) {
        this.users = this.users.filter(x => x != user)
        this.broadcastEventToUsersExcept([user.socket], {
            type: "user-left",
            username: user.username
        })
        if(this.users.length === 0) {
            RoomManager.removeRoom(this)
        }
    }

    getVideoData() { 
        return this.videoData
    }
}