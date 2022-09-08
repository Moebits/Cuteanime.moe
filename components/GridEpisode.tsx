import React, {useContext, useEffect, useState, useRef} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext} from "../Context"
import functions from "../structures/Functions"
import "./styles/gridepisode.less"

interface Props {
    img: string 
    id: string
    num: string | number
    title: string
    mini?: boolean
    active?: boolean
}

const GridEpisode = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const [drag, setDrag] = useState(false)
    const [hover, setHover] = useState(false)
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

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.metaKey || event.ctrlKey || event.button === 1) {
            event.preventDefault()
            const newWindow = window.open(`/anime/${props.id}/${String(props.num).replaceAll(" ", "+")}`, "_blank")
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
                history.push(`/anime/${props.id}/${String(props.num).replaceAll(" ", "+")}`)
            }
        }
    }

    return (
        <div className={props.mini ? "grid-episode-mini" : "grid-episode"} data-active={props.active ? "true" : null}>
            <div className="grid-episode-container">
                <div ref={ref} className="grid-episode-img-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} onAuxClick={onClick} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
                    <img className="grid-episode-img" style={{height: props.mini ? "100px" : "140px"}} src={props.img} ref={imageRef} onMouseMove={(event) => imageAnimation(event)} onMouseLeave={() => cancelImageAnimation()}/>
                </div>
                <div className={`grid-episode-text-container ${!hover ? "hide-grid-episode-text" : ""}`}>
                    <span className="grid-episode-text" style={{fontSize: props.mini ? "20px" : "27px"}}>Episode {props.num}</span>
                    {props.active ? <span className="grid-episode-text" style={{fontSize: props.mini ? "17px" : "25px", color: "var(--activeSubtitles)", marginLeft: "10px"}}>(current)</span> : null}
                </div>
                <div className={`grid-episode-title-container ${!hover ? "hide-grid-episode-title" : ""}`}>
                    <span className="grid-episode-title" style={{fontSize: props.mini ? "15px" : "18px"}}>{props.title}</span>
                </div>
            </div>
        </div>
    )
})

export default GridEpisode