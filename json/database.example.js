import episodeList from "./episodes.example"
import functions from "../structures/Functions"

export const genres = [""]

const getCover = (id, title) => {
    if (functions.isLocalHost()) return getLocalCover(id, title)
    return functions.encodeS3URI(`https://example.moe/${id}/cover/${title}.jpg`)
}

const getEpisodes = (id, title, episodeCount, ovaCount = 0, videoType = "mp4") => {
    if (functions.isLocalHost()) return getLocalEpisodes(id, title, episodeCount, ovaCount, videoType)
    let episodes = []
    let episodeNames = [...Array.from({length: episodeCount}, (_, i) => i + 1), ...Array.from({length: ovaCount}, (_, i) => `OVA ${i + 1}`)]
    for (let i = 0; i < episodeCount + ovaCount; i++) {
        const episode = episodeNames[i]
        const episodeData = episodeList[id][episode]
        episodes.push({
            episodeNumber: episode,
            title: episodeData.title,
            japaneseTitle: episodeData.japaneseTitle,
            synopsis: episodeData.synopsis,
            thumbnail: functions.encodeS3URI(`https://example.moe/${id}/thumbnails/${title} ${episode}.jpg`),
            video: functions.encodeS3URI(`https://example.moe/${id}/videos/${title} ${episode}.${videoType}`),
            japaneseSubs: functions.encodeS3URI(`https://example.moe/${id}/japanese/${title} ${episode}.vtt`),
            englishSubs: functions.encodeS3URI(`https://example.moe/${id}/english/${title} ${episode}.vtt`)
        })
    }
    return episodes
}

const getLocalCover = (id, title) => {
    return `/Anime/${title}/${title}.jpg`
}

const getLocalEpisodes = (id, title, episodeCount, ovaCount = 0, videoType = "mp4") => {
    let episodes = []
    let episodeNames = [...Array.from({length: episodeCount}, (_, i) => i + 1), ...Array.from({length: ovaCount}, (_, i) => `OVA ${i + 1}`)]
    for (let i = 0; i < episodeCount + ovaCount; i++) {
        const episode = episodeNames[i]
        const episodeData = episodeList[id][episode]
        episodes.push({
            episodeNumber: episode,
            title: episodeData.title,
            japaneseTitle: episodeData.japaneseTitle,
            synopsis: episodeData.synopsis,
            thumbnail: `/Anime/${title}/Thumbnails/${title} ${episode}.jpg`,
            video: `/Anime/${title}/Videos/${title} ${episode}.${videoType}`,
            japaneseSubs: `/Anime/${title}/Japanese/${title} ${episode}.vtt`,
            englishSubs:  `/Anime/${title}/English/${title} ${episode}.vtt`
        })
    }
    return episodes
}

export default [
        {
            title: "",
            id: "",
            japaneseTitle: "",
            studios: [""],
            aired: "",
            added: "",
            genres: [""],
            related: [""],
            synopsis: "",
            synopsisSource: "",
            episodeSource: "",
            website: "",
            cover: getCover("", ""),
            episodeCount: 0,
            ovaCount: 0,
            episodes: getEpisodes("", "", 0)
    },
]