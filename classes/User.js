const UserManager = require("./UserManager.js")
module.exports = class User {
    constructor(username, socket) {
        this.username = username
        this.socket = socket
        this.room = null
        UserManager.addUser(this)
    }

    getSocket() {
        return this.socket
    }

    getRoom() {
        return this.room
    }

    getUsername() {
        return this.username
    }

    setRoom(room) {
        this.room = room
    }

    setUsername(username) {
        this.username = username
    }

    setSocket(socket) {
        this.socket = socket
    }


}