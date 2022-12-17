
class VideoData {
    constructor() {
        this.playerURL = ""
        this.inputURL = ""
        this.currentTimestamp = 0
        this.paused = true
        this.animeData = null
    }


    toJSON() {
        return {
            playerURL: this.playerURL,
            inputURL: this.inputURL,
            currentTimestamp: this.currentTimestamp,
            paused: this.paused,
            animeData: this.animeData
        }
    }

    getPlayerURL() {
        return this.playerURL
    }

    getInputURL() {
        return this.inputURL
    }

    setAnimeData(animeData) {
        this.animeData = animeData
    }

    getAnimeData() {
        return this.animeData
    }

    getCurrentTimestamp() {
        return this.currentTimestamp
    }

    isPaused() {
        return this.paused
    }

    setPaused(paused) {
        this.paused = paused
    }

    setCurrentTimestamp(newTimestamp) {
        this.currentTimestamp = newTimestamp
    }

    setPlayerURL(playerURL) {
        this.playerURL = playerURL
    }
    setInputURL(inputURL) {
        this.inputURL = inputURL
    }


}

module.exports = VideoData