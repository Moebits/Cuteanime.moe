import React, {useEffect, useContext, useReducer, useState} from "react"
import {Switch, Route, Redirect, useHistory, useLocation} from "react-router-dom"
import {EnableDragContext} from "../Context"
import TitleBar from "../components/TitleBar"
import SideBar from "../components/SideBar"
import Sortbar from "../components/Sortbar"
import Footer from "../components/Footer"
import AnimeInfo from "../components/AnimeInfo"
import EpisodeGrid from "../components/EpisodeGrid"
import RelatedAnime from "../components/RelatedAnime"
import DonationDialog from "../dialogs/DonationDialog"
import functions from "../structures/Functions"
import database from "../json/database"

interface Props {
    match?: any
}

const AnimeInfoPage: React.FunctionComponent<Props> = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const history = useHistory()

    const id = props.match.params.id
    const info = database.find((m) => m.id === id)
    if (!info) {
        history.push(`/404`)
        return null
    }

    useEffect(() => {
        document.title = `${functions.toProperCase(id.replaceAll("-", " "))}`
        localStorage.removeItem("secondsProgress")
    }, [])

    return (
        <>
        <DonationDialog/>
        <TitleBar rerender={forceUpdate}/>
        <div className="body">
            <SideBar/>
            <div className="content" onMouseEnter={() => setEnableDrag(true)}>
                <AnimeInfo info={info}/>
                <EpisodeGrid info={info}/>
                <RelatedAnime info={info}/>
                <Footer/>
            </div>
        </div>
        </>
    )
}

export default AnimeInfoPage