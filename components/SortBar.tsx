import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext, SidebarSortContext, SearchContext, SearchFlagContext, SortContext, ReverseContext, MobileContext} from "../Context"
import functions from "../structures/Functions"
import date from "../assets/icons/date.png"
import alphabetic from "../assets/icons/alphabetic.png"
import bookmark from "../assets/icons/bookmark.png"
import difficulty from "../assets/icons/difficulty.png"
import sortIcon from "../assets/icons/sort.png"
import sortReverseIcon from "../assets/icons/sortReverse.png"
import searchIcon from "../assets/icons/search.png"
import "./styles/sortbar.less"

interface Props {
    noButtons?: boolean
    id?: string
    anime?: string
    title?: string
    num?: string
}

const SortBar: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {search, setSearch} = useContext(SearchContext)
    const {searchFlag, setSearchFlag} = useContext(SearchFlagContext)
    const {sidebarSort, setSidebarSort} = useContext(SidebarSortContext)
    const {sort, setSort} = useContext(SortContext)
    const {reverse, setReverse} = useContext(ReverseContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const history = useHistory()

    useEffect(() => {
        const savedSort = localStorage.getItem("sort")
        const savedSidebarSort = localStorage.getItem("sidebarSort")
        const savedReverse = localStorage.getItem("reverse")
        if (savedSort) setSort(savedSort)
        if (savedSidebarSort) setSidebarSort(savedSidebarSort)
        if (savedReverse) setReverse(JSON.parse(savedReverse))
    }, [])

    useEffect(() => {
        localStorage.setItem("sort", sort)
        localStorage.setItem("sidebarSort", sidebarSort)
        localStorage.setItem("reverse", JSON.stringify(reverse))
    }, [sort, sidebarSort, reverse])

    const getFilter = () => {
        if (typeof window === "undefined") return
        const bodyStyles = window.getComputedStyle(document.body)
        const color = bodyStyles.getPropertyValue("--gridButton")
        return functions.calculateFilter(color)
    }

    const searchClick = () => {
        if (history.location.pathname !== "/" && history.location.pathname !== "/anime" && history.location.pathname !== "/home") history.push("/anime")
        setSearchFlag(true)
    }

    return (
        <div className="sortbar" style={{justifyContent: props.noButtons ? "flex-end" : "space-between"}}>
            {!props.noButtons ?
            <div className="sortbar-button-container">
                <button className="sortbar-button" onClick={() => setSort("date")}>
                    <span className="sortbar-button-hover" style={{filter: sort === "date" ? getFilter() : ""}}>
                        <img className="sortbar-button-img" src={date}/>
                        <span className="sortbar-button-text">Date</span>
                    </span>
                </button>
                <button className="sortbar-button" onClick={() => setSort("alphabetic")}>
                    <span className="sortbar-button-hover" style={{filter: sort === "alphabetic" ? getFilter() : ""}}>
                        <img className="sortbar-button-img" src={alphabetic}/>
                        <span className="sortbar-button-text">Alphabetic</span>
                    </span>
                </button>
                {!mobile ? <button className="sortbar-button" onClick={() => setSort("bookmarks")}>
                    <span className="sortbar-button-hover" style={{filter: sort === "bookmarks" ? getFilter() : ""}}>
                        <img className="sortbar-button-img" src={bookmark}/>
                        <span className="sortbar-button-text">Bookmarks</span>
                    </span>
                </button> : null}
                {!mobile ? <button className="sortbar-button" onClick={() => setSort("difficulty")}>
                    <span className="sortbar-button-hover" style={{filter: sort === "difficulty" ? getFilter() : ""}}>
                        <img className="sortbar-button-img" src={difficulty}/>
                        <span className="sortbar-button-text">Difficulty</span>
                    </span>
                </button> : null}
                <button className="sortbar-button" onClick={() => setReverse((prev: boolean) => !prev)}>
                    <span className="sortbar-button-hover">
                        <img className="sortbar-button-img" src={reverse ? sortReverseIcon : sortIcon} style={{filter: getFilter()}}/>
                    </span>
                </button>
            </div> : null}
            {props.anime && props.num && props.title && props.id ? 
            <div className="sortbar-episode-container">
                <span className="sortbar-anime-title" onClick={() => history.push(`/anime/${props.id}`)}>{props.anime}</span>
                <span className="sortbar-episode-num">{props.num.includes("OVA") ? props.num : `Episode ${props.num}`}{!mobile ? " -" : ""}</span>
                {!mobile ? <span className="sortbar-episode-title">{props.title}</span> : null}
            </div> : null}
            <div className="sortbar-search-container" onMouseEnter={() => setEnableDrag(false)}>
                <input className="sortbar-search" type="search" placeholder="Anime name..." spellCheck="false" value={search} onChange={(event) => setSearch(event.target.value)}/>
                <button className="sortbar-search-button" onClick={searchClick}>
                    <span className="sortbar-search-button-hover">
                        <img className="sortbar-search-button-img" src={searchIcon}/>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default SortBar