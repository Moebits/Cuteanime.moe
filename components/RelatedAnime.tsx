import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext} from "../Context"
import functions from "../structures/Functions"
import database from "../json/database"
import GridAnime from "./GridAnime"
import "./styles/relatedanime.less"

interface Props {
    info: {
        title: string
        id: string
        japaneseTitle: string
        studios: string[],
        aired: string
        added: string
        genres: string[]
        related: string[]
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

const RelatedAnime: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const history = useHistory()


    const generateJSX = () => {
        let jsx = [] as any
        const related = props.info.related
        for (let i = 0; i < related.length; i++) {
            const anime = database.find((a) => a.id === related[i])
            if (!anime) continue
            jsx.push(<GridAnime id={anime.id} img={anime.cover} title={anime.title} noButtons={true}/>)
        }
        return jsx
    }

    if (!props.info.related.length) return null

    return (
        <div className="related-anime">
            <div className="related-anime-container">
                <span className="related-anime-title">Related:</span>
                <div className="related-anime-grid">
                    {generateJSX()}
                </div>
            </div>
        </div>
    )
}

export default RelatedAnime