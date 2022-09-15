import React, {useContext, useEffect, useState, useRef} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext, MobileContext} from "../Context"
import functions from "../structures/Functions"
import watch from "../assets/icons/watch.png"
import bookmark from "../assets/icons/bookmark.png"
import unbookmark from "../assets/icons/unbookmark.png"
import "./styles/gridanime.less"

interface Props {
    img: string 
    title: string
    id: string
    noButtons?: boolean
    refresh?: () => void
}

const GridAnime: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const [drag, setDrag] = useState(false)
    const [hover, setHover] = useState(false)
    const [saved, setSaved] = useState(false)
    const imageRef = useRef<HTMLImageElement>(null)
    const history = useHistory()

    const imageAnimation = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return
        const rect = imageRef.current.getBoundingClientRect()
        const width = rect?.width
        const height = rect?.height
        const x = event.clientX - rect.x
        const y = event.clientY - rect.y
        const translateX = ((x / width) - 0.5) * 3
        const translateY = ((y / height) - 0.5) * 3
        imageRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(1.02)`
    }

    const cancelImageAnimation = () => {
        if (!imageRef.current) return
        imageRef.current.style.transform = "scale(1)"
    }

    const getFontSize = () => {
        let size = 20
        if (props.title.length <= 5) {
            size = 45
        } else if (props.title.length <= 10) {
            size = 35
        } else if (props.title.length <= 15) {
            size = 30
        } else if (props.title.length <= 25) {
            size = 25
        } else if (props.title.length <= 30) {
            size = 20
        } else {
            size = 20
        }
        if (mobile) size -= 7
        return `${size}px`
    }

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.metaKey || event.ctrlKey || event.button === 1) {
            event.preventDefault()
            const newWindow = window.open(`/anime/${props.id}`, "_blank")
            newWindow?.blur()
            window.focus()
        }
    }

    const mouseDown = (event: React.MouseEvent<HTMLElement>) => {
        setDrag(false)
    }

    const mouseMove = (event: React.MouseEvent<HTMLElement>) => {
        setDrag(true)
    }

    const mouseUp = async (event: React.MouseEvent<HTMLElement>) => {
        if (!drag) {
            if (event.metaKey || event.ctrlKey || event.button == 1) {
                return
            } else {
                history.push(`/anime/${props.id}`)
            }
        }
    }

    const save = () => {
        let bookmarkStr = localStorage.getItem("bookmarks")
        if (!bookmarkStr) bookmarkStr = "{}"
        const bookmarks = JSON.parse(bookmarkStr)
        if (bookmarks[props.id]) {
            delete bookmarks[props.id]
            setSaved(false)
        } else {
            bookmarks[props.id] = true
            setSaved(true)
        }
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        props.refresh?.()
    }

    useEffect(() => {
        let bookmarkStr = localStorage.getItem("bookmarks")
        if (!bookmarkStr) bookmarkStr = "{}"
        const bookmarks = JSON.parse(bookmarkStr)
        setSaved(bookmarks[props.id] === true)
    }, [props.id])

    return (
        <div className="grid-anime">
            <div className="grid-anime-container">
                <div className="grid-anime-img-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} onAuxClick={onClick} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
                    <img className="grid-anime-img" src={props.img} ref={imageRef} onMouseMove={(event) => imageAnimation(event)} onMouseLeave={() => cancelImageAnimation()}/>
                    <div className={`grid-anime-text-container ${!hover ? "hide-grid-anime-text" : ""}`}>
                        <span className="grid-anime-text" style={{fontSize: getFontSize()}}>{props.title}</span>
                    </div>
                </div>
                {!mobile && !props.noButtons ? <div className="grid-anime-button-container">
                    <button className="grid-anime-button" onClick={() => history.push(`/anime/${props.id}`)} onAuxClick={onClick}>
                        <span className="grid-anime-button-hover">
                            <img className="grid-anime-button-img" src={watch}/>
                            <span className="grid-anime-button-text">Watch</span>
                        </span>
                    </button>
                    <button className="grid-anime-button" onClick={save}>
                        <span className="grid-anime-button-hover">
                            <img className="grid-anime-button-img" src={saved ? unbookmark : bookmark}/>
                            <span className="grid-anime-button-text">{saved ? "Unsave" : "Save"}</span>
                        </span>
                    </button>
                </div> : null}
            </div>
        </div>
    )
}

export default GridAnime