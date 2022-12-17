
module.exports = class UserManager {
    static users = []

    static addUser(user) {
        this.users.push(user)
    }

    static deleteUser(user) {
        if(user.room) {
            user.room.removeUser(user)
        }
        this.users = this.users.filter(u => u !== user)
    }

    static findUserBySocket(socket) {
        return this.users.find(u => u.socket === socket)
    }
}