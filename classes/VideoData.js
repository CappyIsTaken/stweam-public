
class VideoData {
    constructor() {
        this.playerURL = ""
        this.inputURL = ""
        this.currentTimestamp = 0
        this.paused = true
        this.additionalInfo = null
        this.currentlyLoadedURL = ""
    }
    
    setCurrentlyLoadedURL(newURL) {
        this.currentlyLoadedURL = newURL
    }

    getCurrentlyLoaded() {
        return this.currentlyLoadedURL
    }

    toJSON() {
        return {
            playerURL: this.playerURL,
            inputURL: this.inputURL,
            currentTimestamp: this.currentTimestamp,
            paused: this.paused,
            additionalInfo: this.additionalInfo
        }
    }

    getPlayerURL() {
        return this.playerURL
    }

    getInputURL() {
        return this.inputURL
    }

    setAdditionalInfo(additionalInfo) {
        this.additionalInfo = additionalInfo
    }

    getAdditionalInfo() {
        return this.additionalInfo
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