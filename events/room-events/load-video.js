const RoomManager = require("../../classes/RoomManager.js")
const axios = require("axios").default

function extractVideoID(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    } else {
      alert('Could not extract video ID.');
    }
  }


async function setRoomVideoURL(room) {
    const inputURL = room.getVideoData().getInputURL()
    if(inputURL === room.getVideoData().getCurrentlyLoaded()) {
        return -1
    }
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
        room.getVideoData().setAdditionalInfo(animeData)
        return 1
    }
    if(inputURL.startsWith("https://www.youtube.com/watch") || inputURL.startsWith("https://youtu.be/")) {
        room.getVideoData().setPlayerURL(extractVideoID(inputURL))
        return 1
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
        const resp = await setRoomVideoURL(room)
        if(resp == 1) {
            room.broadcastEventToUsers({
                type: "load-video",
                videoData: room.getVideoData().toJSON()
            })
        }
        
    }
}

module.exports = OnLoadVideo