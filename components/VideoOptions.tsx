import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {EnableDragContext, MobileContext} from "../Context"
import functions from "../structures/Functions"
import back from "../assets/icons/back.png"
import bookmark from "../assets/icons/bookmark.png"
import unbookmark from "../assets/icons/unbookmark.png"
import support from "../assets/icons/support.png"
import database from "../json/database"
import download from "../assets/icons/download.png"
import "./styles/videooptions.less"

interface Props {
    num: string
    info: {
        title: string
        id: string
        japaneseTitle: string
        studios: string[],
        aired: string
        added: string
        genres: string[]
        synopsis: string
        synopsisSource: string
        episodeSource: string
        website: string
        cover: string
        episodeCount: number
        ovaCount: number
        episodes: {
            episodeNumber: string | number
            title: string
            japaneseTitle: string
            synopsis: string
            thumbnail: string
            video: string
            japaneseSubs: string
            englishSubs: string
        }[]
    }
}

const VideoOptions: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const [saved, setSaved] = useState(false)
    const history = useHistory()

    const num = props.num.includes("OVA") ? props.num : Number(props.num)

    const save = () => {
        let bookmarkStr = localStorage.getItem("bookmarks")
        if (!bookmarkStr) bookmarkStr = "{}"
        const bookmarks = JSON.parse(bookmarkStr)
        if (bookmarks[props.info.id]) {
            delete bookmarks[props.info.id]
            setSaved(false)
        } else {
            bookmarks[props.info.id] = true
            setSaved(true)
        }
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }

    useEffect(() => {
        let bookmarkStr = localStorage.getItem("bookmarks")
        if (!bookmarkStr) bookmarkStr = "{}"
        const bookmarks = JSON.parse(bookmarkStr)
        setSaved(bookmarks[props.info.id] === true)
    }, [props.info.id])

    const downloadSubs = () => {
        const episode = props.info.episodes.find((e) => e.episodeNumber === num)
        if (episode) {
            functions.download(`${props.info.title} ${num}.vtt`, episode.japaneseSubs)
        }
    }

    return (
        <div className="video-options">
            <div className="video-options-container">
                <button className="video-options-button" onClick={() => history.push(`/anime/${props.info.id}`)}>
                    <span className="video-options-button-hover">
                        <img className="video-options-button-img" src={back}/>
                        <span className="video-options-button-text">{"Back"}</span>
                    </span>
                </button>
            </div>
            <div className="video-options-container">
                {!mobile ? <>
                <button className="video-options-button" onClick={downloadSubs}>
                    <span className="video-options-button-hover">
                        <img className="video-options-button-img" src={download}/>
                        <span className="video-options-button-text">{"Download Subs"}</span>
                    </span>
                </button>
                <button className="video-options-button" onClick={save}>
                    <span className="video-options-button-hover">
                        <img className="video-options-button-img" src={saved ? unbookmark : bookmark}/>
                        <span className="video-options-button-text">{saved ? "Unbookmark" : "Bookmark"}</span>
                    </span>
                </button></> : null}
                <button className="video-options-button" onClick={() => window.open(props.info.website, "_blank")}>
                    <span className="video-options-button-hover">
                        <img className="video-options-button-img" src={support}/>
                        <span className="video-options-button-text">{"Support"}</span>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default VideoOptions