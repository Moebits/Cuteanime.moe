import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext, SearchContext, SortContext, SearchFlagContext, GenreContext, ReverseContext, MobileContext} from "../Context"
import functions from "../structures/Functions"
import GridAnime from "./GridAnime"
import pageLeft from "../assets/icons/pageLeft.png"
import pageRight from "../assets/icons/pageRight.png"
import database from "../json/database"
import dbFunctions from "../structures/DatabaseFunctions"
import "./styles/animegrid.less"

const AnimeGrid: React.FunctionComponent = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {search, setSearch} = useContext(SearchContext)
    const {searchFlag, setSearchFlag} = useContext(SearchFlagContext)
    const {genre, setGenre} = useContext(GenreContext)
    const {sort, setSort} = useContext(SortContext)
    const {reverse, setReverse} = useContext(ReverseContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const [animeList, setAnimeList] = useState([]) as any
    const history = useHistory()

    const updateAnimeList = () => {
        const list = dbFunctions.getSorted(search, genre, sort, reverse)
        setAnimeList(list)
    }

    useEffect(() => {
        updateAnimeList()
    }, [])

    useEffect(() => {
        if (searchFlag) setSearchFlag(false)
        updateAnimeList()
    }, [searchFlag, genre, sort, reverse])

    const generateJSX = () => {
        let jsx = [] as any
        let step = mobile ? 2 : 4
        for (let i = 0; i < animeList.length; i+=step) {
            let gridImages = [] as any
            for (let j = 0; j < step; j++) {
                const k = i+j
                if (!animeList[k]) break
                gridImages.push(<GridAnime img={animeList[k].cover} title={animeList[k].title} id={animeList[k].id} key={k} refresh={updateAnimeList}/>)
            }
            jsx.push(
                <div className="anime-grid-row">
                    {gridImages}
                </div>
            )

        }
        return jsx 
    }

    return (
        <div className="anime-grid">
            <div className="anime-grid-container">
                {generateJSX()}
            </div>
            {/* <div className="anime-grid-page-container">
                <button className="anime-grid-page-button">
                    <span className="anime-grid-page-button-hover">
                        <img className="anime-grid-page-button-img" src={pageLeft}/>
                    </span>
                </button>
                <button className="anime-grid-page-button">
                    <span className="anime-grid-page-button-hover">
                        <span className="anime-grid-page-button-text">1</span>
                    </span>
                </button>
                <button className="anime-grid-page-button">
                    <span className="anime-grid-page-button-hover">
                        <span className="anime-grid-page-button-text">2</span>
                    </span>
                </button>
                <button className="anime-grid-page-button">
                    <span className="anime-grid-page-button-hover">
                        <span className="anime-grid-page-button-text">3</span>
                    </span>
                </button>
                <button className="anime-grid-page-button">
                    <span className="anime-grid-page-button-hover">
                        <span className="anime-grid-page-button-text">...</span>
                    </span>
                </button>
                <button className="anime-grid-page-button">
                    <span className="anime-grid-page-button-hover">
                        <img className="anime-grid-page-button-img" src={pageRight}/>
                    </span>
                </button>
            </div> */}
        </div>
    )
}

export default AnimeGrid