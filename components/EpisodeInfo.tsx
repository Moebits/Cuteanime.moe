import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {EnableDragContext, MobileContext} from "../Context"
import info from "../assets/icons/info.png"
import functions from "../structures/Functions"
import database from "../assets/icons/database.png"
import "./styles/episodeinfo.less"

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

const EpisodeInfo: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const history = useHistory()

    const num = props.num.includes("OVA") ? props.num : Number(props.num)
    const episode = props.info.episodes.find((e) => e.episodeNumber === num)
    if (!episode) {
        history.push("/404")
        return null 
    }

    const getFilter = () => {
        if (typeof window === "undefined") return
        const bodyStyles = window.getComputedStyle(document.body)
        const color = bodyStyles.getPropertyValue("--text")
        return functions.calculateFilter(color)
    }

    return (
        <div className="episode-info">
            <div className="episode-info-row">
                <img className="episode-info-icon" src={info} style={{filter: getFilter()}}/>
                <span className="episode-info-title">Info</span>
            </div>
            <div className="episode-info-row">
                <img className="episode-info-img" src={episode.thumbnail}/>
            </div>
            <div className="episode-info-row">
                <span className="episode-info-category">Anime:</span>
                <span className="episode-info-content">{props.info.title}</span>
            </div>
            <div className="episode-info-row">
                <span className="episode-info-category">Japanese:</span>
                <span className="episode-info-content">{props.info.japaneseTitle}</span>
            </div>
            <div className="episode-info-row">
                <span className="episode-info-category">{props.info.studios.length === 1 ? "Studio:" : "Studios:"}</span>
                <span className="episode-info-content">{props.info.studios.join(", ")}</span>
            </div>
            <div className="episode-info-row">
                <span className="episode-info-category">Aired:</span>
                <span className="episode-info-content">{props.info.aired}</span>
            </div>
            <div className="episode-info-row">
                <span className="episode-info-category">Episode:</span>
                <span className="episode-info-content">{episode.episodeNumber}</span>
            </div>
            <div className="episode-info-row">
                <span className="episode-info-category">Title:</span>
                <span className="episode-info-content">{episode.title}</span>
            </div>
            <div className="episode-info-row">
                <span className="episode-info-category">Japanese:</span>
                <span className="episode-info-content">{episode.japaneseTitle}</span>
            </div>
            <div className="episode-info-row">
                <span className="episode-info-category">Synopsis:</span>
                <span className="episode-info-content">{episode.synopsis} <span className="episode-info-text-content-link" onClick={() => window.open(props.info.episodeSource, "_blank")}>[{functions.websiteName(props.info.episodeSource)}]</span></span>
            </div>
        </div>
    )
}

export default EpisodeInfo