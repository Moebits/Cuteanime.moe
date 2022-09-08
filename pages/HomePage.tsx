import React, {useEffect, useContext, useReducer, useState} from "react"
import {EnableDragContext} from "../Context"
import TitleBar from "../components/TitleBar"
import SideBar from "../components/SideBar"
import Sortbar from "../components/Sortbar"
import MangaGrid from "../components/AnimeGrid"
import Footer from "../components/Footer"
import DonationDialog from "../dialogs/DonationDialog"

const HomePage: React.FunctionComponent = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    useEffect(() => {
        document.title = "CuteAnime: Watch Anime with Japanese subtitles"
    }, [])

    return (
        <>
        <DonationDialog/>
        <TitleBar rerender={forceUpdate}/>
        <div className="body">
            <SideBar/>
            <div className="content" onMouseEnter={() => setEnableDrag(true)}>
                <Sortbar/>
                <MangaGrid/>
                <Footer/>
            </div>
        </div>
        </>
    )
}

export default HomePage