import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext} from "../Context"
import functions from "../structures/Functions"
import "./styles/animeinfo.less"

interface Props {
    info: {
        title: string
        id: string
        japaneseTitle: string
        studios: string[],
        aired: string
        added: string
        genres: string[]
        difficulty: number
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

const AnimeInfo: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const history = useHistory()

    return (
        <div className="anime-info">
            <div className="anime-info-container">
                <div className="anime-info-img-container">
                    <img className="anime-info-img" src={props.info.cover}/>
                </div>
                <div className="anime-info-text-container">
                    <div className="anime-info-text-row">
                        <span className="anime-info-text-title">{props.info.title}</span>
                    </div>
                    <div className="anime-info-text-row">
                        <span className="anime-info-text-category">Japanese:</span>
                        <span className="anime-info-text-content">{props.info.japaneseTitle}</span>
                    </div>
                    <div className="anime-info-text-row">
                        <span className="anime-info-text-category">{props.info.studios.length === 1 ? "Studio:" : "Studios:"}</span>
                        <span className="anime-info-text-content">{props.info.studios.join(", ")}</span>
                    </div>
                    <div className="anime-info-text-row">
                        <span className="anime-info-text-category">Aired:</span>
                        <span className="anime-info-text-content">{props.info.aired}</span>
                    </div>
                    <div className="anime-info-text-row">
                        <span className="anime-info-text-category">Genres:</span>
                        <span className="anime-info-text-content">{props.info.genres.join(", ")}</span>
                    </div>
                    <div className="anime-info-text-row">
                        <span className="anime-info-text-category">Difficulty:</span>
                        <span className="anime-info-text-content">{props.info.difficulty}</span>
                    </div>
                    <div className="anime-info-text-row">
                        <span className="anime-info-text-category">Synopsis:</span>
                        <span className="anime-info-text-content">{props.info.synopsis} <span className="anime-info-text-content-link" onClick={() => window.open(props.info.synopsisSource, "_blank")}>[{functions.websiteName(props.info.synopsisSource)}]</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimeInfo