import React, {useContext, useEffect, useState, useRef} from "react"
import {useHistory} from "react-router-dom"
import {EnableDragContext, MobileContext} from "../Context"
import GridEpisode from "./GridEpisode"
import functions from "../structures/Functions"
import database from "../assets/icons/database.png"
import carouselLeft from "../assets/icons/carousel-left.png"
import carouselRight from "../assets/icons/carousel-right.png"
import "./styles/episodecarousel.less"

interface Props {
    index?: number
    num: string
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

let startX = 0

const EpisodeCarousel: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)
    const [lastPos, setLastPos] = useState(null) as any
    const [dragging, setDragging] = useState(false) as any
    const [episodesRef, setEpisodesRef] = useState(props.info.episodes.map(() => React.createRef())) as any
    const [lastActive, setLastActive] = useState(episodesRef[props.index ? props.index : 0])
    const [active, setActive] = useState(episodesRef[props.index ? props.index : 0])
    const sliderRef = useRef<any>(null)
    const history = useHistory()

    const scrollToEpisode = async () => {
        const slider = document.querySelector(".episode-carousel-slider") as HTMLDivElement
        const element = document.querySelector(".grid-episode-mini[data-active=\"true\"]") as HTMLDivElement
        await functions.timeout(100)
        if (element && slider) {
            const middle = element.offsetWidth * 2
            const lowBound = middle
            const highBound = slider.offsetWidth - middle
            let elementPos = element.offsetLeft / 2
            if (elementPos > lowBound && elementPos < highBound) {
                slider.style.marginLeft = `${-(elementPos + middle)}px`
            } 
            if (elementPos >= highBound) {
                slider.style.marginLeft = `${-(slider.offsetWidth)}px`
            }
        }
    }

    useEffect(() => {
        const newEpisodesRef = props.info.episodes.map(() => React.createRef()) as any
        setEpisodesRef(newEpisodesRef) as any
        setActive(newEpisodesRef[props.index ? props.index : 0])
        setLastActive(newEpisodesRef[props.index ? props.index : 0])
        setShowLeftArrow(false)
        setShowRightArrow(false)
        setLastPos(null)
        setDragging(false)
        scrollToEpisode()
    }, [props.num])
    
    useEffect(() => {
        if (props.index !== undefined) {
            setActive(episodesRef[props.index])
        }
    }, [props.index])

    const getFilter = (active?: boolean) => {
        if (typeof window === "undefined") return
        const bodyStyles = window.getComputedStyle(document.body)
        const color = bodyStyles.getPropertyValue("--text")
        return functions.calculateFilter(color)
    }

    useEffect(() => {
        if (!active) return
        setLastActive(active)
    }, [active])


    const generateJSX = () => {
        let jsx = [] as any
        for (let i = 0; i < props.info.episodes.length; i++) {
            const episode = props.info.episodes[i]
            const num = props.num.includes("OVA") ? props.num : Number(props.num)
            jsx.push(<GridEpisode active={num === episode.episodeNumber} ref={episodesRef[i]} mini={true} id={props.info.id} num={episode.episodeNumber} img={episode.thumbnail} title={episode.title}/>)
        }
        return jsx
    }

    const arrowLeftEnter = () => {
        if (!sliderRef.current) return
        let marginLeft = parseInt(sliderRef.current.style.marginLeft)
        if (Number.isNaN(marginLeft)) marginLeft = 0
        if (marginLeft < 0) setShowLeftArrow(true)
    }

    const arrowRightEnter = () => {
        if (!lastPos) setShowRightArrow(true)
        if (!sliderRef.current) return
        let marginLeft = parseInt(sliderRef.current.style.marginLeft)
        if (Number.isNaN(marginLeft)) marginLeft = 0
        if (marginLeft > lastPos) setShowRightArrow(true)
    }

    const arrowLeftClick = () => {
        if (!showLeftArrow) return
        if (!sliderRef.current) return
        let marginLeft = parseInt(sliderRef.current.style.marginLeft)
        if (Number.isNaN(marginLeft)) marginLeft = 0
        let newMargin = marginLeft + ((window.innerWidth - 120) / 2)
        if (newMargin > 0) newMargin = 0
        sliderRef.current.style.transition = "margin-left 0.75s"
        sliderRef.current.style.marginLeft = `${newMargin}px`
        setTimeout(() => {
            if (!sliderRef.current) return
            sliderRef.current.style.transition = "margin-left 0.05s"
        }, 1000)
    }

    const handleIntersection = (entries: any) => {
        for (let entry of entries) {
            if (entry.intersectionRatio === 1) {
                if (!sliderRef.current) return
                const margin = parseInt(sliderRef.current.style.marginLeft)
                if (margin < 0) setLastPos(margin)
            }
        }
    }

    let entriesSeen = new Set()

    const handleResize = (entries: any) => {
        for (let entry of entries) {
            if (!entriesSeen.has(entry.target)) {
                entriesSeen.add(entry.target)
            } else {
                setLastPos(null)
            }
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") return
        const observer = new IntersectionObserver(handleIntersection, {root: null, rootMargin: "0px", threshold: 1})
        const resizeObserver = new ResizeObserver(handleResize)
        const element = episodesRef[episodesRef.length - 1]?.current
        if (element) {
            observer.observe(element)
            resizeObserver.observe(element)
        }
        return () => {
            observer.disconnect()
            resizeObserver.disconnect()
        }
    })

    const arrowRightClick = () => {
        if (!showRightArrow) return
        if (!sliderRef.current) return
        let marginLeft = parseInt(sliderRef.current.style.marginLeft)
        if (Number.isNaN(marginLeft)) marginLeft = 0
        let newMargin = marginLeft - ((window.innerWidth - 120) / 2)
        if (lastPos) if (newMargin < lastPos) newMargin = lastPos
        sliderRef.current.style.transition = "margin-left 0.75s"
        sliderRef.current.style.marginLeft = `${newMargin}px`
        setTimeout(() => {
            if (!sliderRef.current) return
            sliderRef.current.style.transition = "margin-left 0.05s"
        }, 1000)
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        setDragging(true)
        startX = event.pageX
    }

    const handleMouseMove = (event: React.MouseEvent) => {
        if (props.info.episodes.length <= 1) return
        if (!dragging) return
        if (!sliderRef.current) return
        let marginLeft = parseInt(sliderRef.current.style.marginLeft)
        if (Number.isNaN(marginLeft)) marginLeft = 0
        if (event.pageX < startX) {
            marginLeft -= 20
        } else if (event.pageX > startX) {
            marginLeft += 20
        }
        if (marginLeft > 0) marginLeft = 0
        if (lastPos) if (marginLeft < lastPos) marginLeft = lastPos
        sliderRef.current.style.marginLeft = `${marginLeft}px`
        startX = event.pageX
    }

    const handleMouseUp = (event: React.MouseEvent) => {
        setDragging(false)
    }

    const handleTouchStart = (event: React.TouchEvent) => {
        if (!event.touches.length) return
        setDragging(true)
        startX = event.touches[0].pageX
    }

    const handleTouchMove = (event: React.TouchEvent) => {
        if (props.info.episodes.length <= 1) return
        if (!event.touches.length) return
        if (!dragging) return
        if (!sliderRef.current) return
        let marginLeft = parseInt(sliderRef.current.style.marginLeft)
        if (Number.isNaN(marginLeft)) marginLeft = 0
        if (event.touches[0].pageX < startX) {
            marginLeft -= 10
        } else if (event.touches[0].pageX > startX) {
            marginLeft += 10
        }
        if (marginLeft > 0) marginLeft = 0
        if (lastPos) if (marginLeft < lastPos) marginLeft = lastPos
        sliderRef.current.style.marginLeft = `${marginLeft}px`
        startX = event.touches[0].pageX
    }

    const handleTouchEnd = (event: React.TouchEvent) => {
        setDragging(false)
    }

    return (
        <div className="episode-carousel">
            <img className={`episode-carousel-left ${showLeftArrow ? "arrow-visible" : ""}`} src={carouselLeft} onMouseEnter={arrowLeftEnter} onMouseLeave={() => setShowLeftArrow(false)} onClick={arrowLeftClick} style={{filter: getFilter()}}/>
            <div ref={sliderRef} className="episode-carousel-slider" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setEnableDrag(false)} onMouseLeave={() => setEnableDrag(true)}>
                {generateJSX()}
            </div>
            <img className={`episode-carousel-right ${showRightArrow ? "arrow-visible" : ""}`} src={carouselRight} onMouseEnter={arrowRightEnter} onMouseLeave={() => setShowRightArrow(false)} onClick={arrowRightClick} style={{filter: getFilter()}}/>
        </div>
    )
}

export default EpisodeCarousel