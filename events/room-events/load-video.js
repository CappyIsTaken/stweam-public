const RoomManager = require("../../classes/RoomManager.js")
const axios = require("axios").default

async function setRoomVideoURL(room) {
    const inputURL = room.getVideoData().getInputURL()
    if(inputURL.startsWith("https://animixplay.to/v1/")) {
        let parts = inputURL.split("/")
        if(!parts.at(-1).includes("ep")) parts.push("ep1")
        const episode = parts.at(-1)
        const id = parts.at(-2)
        const infoURL = `https://impossible-gilet-bull.cyclic.app/animix/watch/${id}-episode-${episode.replace("ep", "")}`
        const info = await axios.get(infoURL)
        const videoURL = info.data.sources
        const animeData = {
            episode: info.data.episodeNum,
            title: info.data.animeInfo.animeTitle,
            fullTitle: `${info.data.animeInfo.animeTitle} ${episode}`,
            genres: info.data.animeInfo.genres,
            status: info.data.animeInfo.status,
            totalEpisodes: info.data.animeInfo.total_episodes
        }
        room.getVideoData().setPlayerURL(videoURL)
        room.getVideoData().setAnimeData(animeData)
    }
}

async function OnLoadVideo(socket,data) {
    const {roomID} = data
    if(!roomID) return
    const room = RoomManager.findRoomByID(roomID)
    if(room) {
        room.broadcastEventToUsersExcept([socket], {
            type: "pre-load"
        })
        await setRoomVideoURL(room)
        room.broadcastEventToUsers({
            type: "load-video",
            videoData: room.getVideoData().toJSON()
        })
    }
}

module.exports = OnLoadVideo