import React, {useEffect, useContext, useReducer, useState} from "react"
import {Switch, Route, Redirect, useHistory, useLocation} from "react-router-dom"
import {EnableDragContext, MobileContext} from "../Context"
import TitleBar from "../components/TitleBar"
import SideBar from "../components/SideBar"
import Sortbar from "../components/Sortbar"
import Footer from "../components/Footer"
import DonationDialog from "../dialogs/DonationDialog"
import VideoPlayer from "../components/VideoPlayer"
import EpisodeCarousel from "../components/EpisodeCarousel"
import VideoOptions from "../components/VideoOptions"
import EpisodeInfo from "../components/EpisodeInfo"
import EpisodeSubtitles from "../components/EpisodeSubtitles"
import functions from "../structures/Functions"
import database from "../json/database"
import episodes from "../json/episodes"
import "./styles/animepage.less"

interface Props {
    match?: any
}

const AnimePage: React.FunctionComponent<Props> = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const history = useHistory()

    const id = props.match.params.id
    const num = props.match.params.num.replaceAll("+", " ")
    const info = database.find((m) => m.id === id)
    if (!info) {
        history.push(`/404`)
        return null
    }

    useEffect(() => {
        document.title = `${functions.toProperCase(id.replaceAll("-", " "))} ${num}`
    }, [])

    return (
        <>
        <DonationDialog/>
        <TitleBar rerender={forceUpdate}/>
        <div className="body">
            <div className="content" onMouseEnter={() => setEnableDrag(true)}>
                <Sortbar noButtons={true} anime={info.title} id={info.id} num={num} title={episodes[id][num].title}/>
                <div className="anime-page-container">
                    <div className="anime-page-video-container">
                        <VideoPlayer info={info} num={num}/>
                        <EpisodeCarousel info={info} num={num}/>
                        <VideoOptions info={info} num={num}/>
                    </div>
                    {!mobile ? 
                    <div className="anime-page-subtitle-container">
                        <EpisodeSubtitles ep={`${info.id} ${num}`}/>
                        <EpisodeInfo info={info} num={num}/>
                    </div> : null}
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}

export default AnimePage