import episodeList from "./episodes.example"

export const genres = [""]

const getCover = (id, title) => {
    return `https://example.moe/${id}/${title.replaceAll(" ", "+")}.jpg`
}

const getEpisodes = (id, title, episodeCount, ovaCount = 0, videoType = "mp4") => {
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
            thumbnail: `https://example.moe/${id}/thumbnails/${title.replaceAll(" ", "+")}+${episode}.jpg`,
            video: `https://example.moe/${id}/videos/${title.replaceAll(" ", "+")}+${episode}.${videoType}`,
            japaneseSubs: `https://example.moe/${id}/japanese/${title.replaceAll(" ", "+")}+${episode}.vtt`,
            englishSubs: `https://example.moe/${id}/english/${title.replaceAll(" ", "+")}+${episode}.vtt`
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