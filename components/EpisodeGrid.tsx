import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext} from "../Context"
import functions from "../structures/Functions"
import GridEpisode from "./GridEpisode"
import "./styles/episodegrid.less"

interface Props {
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

const EpisodeGrid: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const history = useHistory()

    const generateJSX = () => {
        let jsx = [] as any
        const episodes = props.info.episodes
        for (let i = 0; i < episodes.length; i++) {
            jsx.push(<GridEpisode img={episodes[i].thumbnail} num={episodes[i].episodeNumber} title={episodes[i].title} id={props.info.id}/>)
        }
        return jsx
    }

    return (
        <div className="episode-grid">
            <div className="episode-grid-container">
                <span className="episode-grid-title">Episodes:</span>
                <div className="episode-grid-volumes">
                    {generateJSX()}
                </div>
            </div>
        </div>
    )
}

export default EpisodeGrid