const express = require("express")

const app = express()
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")

const fs = require("fs")

const path = require("path")

const axios = require("axios").default


let events = {}




app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


const UserManager = require("./classes/UserManager.js")
io.on("connection", (socket) => {
    console.log(`A user has been connected: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`A user has been disconnected: ${socket.id}`)
        const user = UserManager.findUserBySocket(socket)
        if(user) {
            UserManager.deleteUser(user)
        }
        socket.removeAllListeners()
    })

    if(events) {
        const eventKeys = Object.keys(events)
        for(const key of eventKeys) {
            console.log(`Adding event listener for socket ${socket.id} for ${key}`)
            socket.on(key, async (data) => {
                const eventFunc = events[key][data.type]
                if(eventFunc) {
                    await eventFunc(socket, data)
                }
            })
        }
    }

})

function readEvents(folderPath) {
    const files = fs.readdirSync(folderPath).filter(x => x.endsWith(".js"))
    const obj = {}
    for(const file of files) {
        const p = path.join(folderPath, file)
        obj[file.replace(".js", "")] = require(p)
    }
    return obj

}

function initializeEvents() {
    const allEvents = {}
    const eventsPath = path.join(__dirname, "events")
    const eventsFolderContents = fs.readdirSync(eventsPath, {withFileTypes: true})
    for(const child of eventsFolderContents) {
        if(child.isDirectory()) {
            const events = readEvents(path.join(eventsPath, child.name))
            allEvents[child.name] = events
        }
    }
    return allEvents
}


server.listen(3001, () => {
    console.log("SERVER IS RUNNING!")
    events = initializeEvents()
})






