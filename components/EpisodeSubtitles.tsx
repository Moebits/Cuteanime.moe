import React, {useContext, useEffect, useState, useMemo, useRef} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext, MobileContext, SubtitleIndexENContext, SubtitleIndexJAContext, JapaneseCuesContext, 
EnglishCuesContext, JumpFlagContext, SiteColorChangeContext} from "../Context"
import functions from "../structures/Functions"
import checkbox from "../assets/icons/checkbox.png"
import checkboxChecked from "../assets/icons/checkbox-checked.png"
import subtitleMarker from "../assets/icons/subtitleMarker.png"
import "./styles/episodesubtitles.less"

interface Props {
    ep: string
}

const EpisodeSubtitles: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const {siteColorChange, setSiteColorChange} = useContext(SiteColorChangeContext)
    const {japaneseCues, setJapaneseCues} = useContext(JapaneseCuesContext) as any
    const {englishCues, setEnglishCues} = useContext(EnglishCuesContext) as any
    const {subtitleIndexJA, setSubtitleIndexJA} = useContext(SubtitleIndexJAContext)
    const {subtitleIndexEN, setSubtitleIndexEN} = useContext(SubtitleIndexENContext)
    const [showSubtitleTranslation, setShowSubtitleTranslation] = useState(false)
    const [lastElement, setLastElement] = useState(null) as any
    const {jumpFlag, setJumpFlag} = useContext(JumpFlagContext)
    const containerRef = useRef(null) as any
    const history = useHistory()

    const getFilter = (active?: boolean) => {
        if (typeof window === "undefined") return
        const bodyStyles = window.getComputedStyle(document.body)
        const color = active ? bodyStyles.getPropertyValue("--activeSubtitles") : bodyStyles.getPropertyValue("--text")
        return functions.calculateFilter(color)
    }

    const getSortedCues = () => {
        if (!japaneseCues || !englishCues) return []
        const cueArray = [] as any
        for (let i = 0; i < japaneseCues.length; i++) {
            const cue = japaneseCues[i]
            let englishCueArr = Array.from(englishCues).filter((c: any) => functions.between(cue.startTime, c.startTime, c.endTime) ||
            functions.between(c.startTime, cue.startTime, cue.endTime)).map((c: any) => c.text) as any[]
            cueArray.push({
                text: functions.cleanSubs(cue.text),
                englishText: functions.cleanSubs(englishCueArr.join(" ") || "")
            })
        }
        return cueArray
    }

    const sortedCues = useMemo(() => {
        return getSortedCues()
    }, [japaneseCues, englishCues]) as any

    const generateJSX = () => {
        let jsx = [] as any
        for (let i = 0; i < sortedCues.length; i++) {
            jsx.push(
                <div className="episode-subtitles-cue" onMouseEnter={() => setEnableDrag(false)}>
                    <div className="episode-subtitles-cue-row">
                        <img className="episode-subtitles-cue-marker" src={subtitleMarker} style={{filter: getFilter()}} onClick={() => setJumpFlag(i)}/>
                        <span className="episode-subtitles-cue-text">{sortedCues[i].text}</span>
                    </div>
                    {showSubtitleTranslation ?
                    <div className="episode-subtitles-cue-row">
                        <span className="episode-subtitles-cue-text">{sortedCues[i].englishText}</span>
                    </div> : null}
                </div>
            )
        }
        return jsx
    }

    const subtitleJSX = useMemo(() => {
        return generateJSX()
    }, [sortedCues, showSubtitleTranslation, siteColorChange])

    useEffect(() => {
        const element = document.querySelectorAll(".episode-subtitles-cue").item(subtitleIndexJA) as HTMLDivElement
        if (lastElement) {
            lastElement.style.borderColor = "var(--text)"
            lastElement.querySelectorAll(".episode-subtitles-cue-text").forEach((e: any) => {
                e.style.color = "var(--text)"
            });
            (lastElement.querySelector(".episode-subtitles-cue-marker") as HTMLImageElement).style.filter = getFilter() || ""
        }
        if (element) {
            element.style.borderColor = "var(--activeSubtitles)"
            element.querySelectorAll(".episode-subtitles-cue-text").forEach((e: any) => {
                e.style.color = "var(--activeSubtitles)"
            });
            (element.querySelector(".episode-subtitles-cue-marker") as HTMLImageElement).style.filter = getFilter(true) || ""

            const container = document.querySelector(".episode-subtitles-subtitle-container") as HTMLDivElement
            if (container) {
                const middle = container.clientHeight / 3
                const lowBound = middle
                const highBound = container.scrollHeight - middle
                const elementPos = element.offsetTop
                if (elementPos > lowBound && elementPos < highBound) {
                    container.scrollTo({top: elementPos - middle, behavior: "smooth"})
                }
                if (elementPos >= highBound) {
                    container.scrollTo({top: container.scrollHeight, behavior: "smooth"})
                }
            }
        }
        setLastElement(element)
    }, [subtitleIndexJA, subtitleJSX])

    if (!japaneseCues || !englishCues) return null

    return (
        <div className="episode-subtitles" onMouseEnter={() => setEnableDrag(false)}>
            <div className="episode-subtitles-title-container">
                <div className="episode-subtitles-title-column">
                    <span className="episode-subtitles-title">Subtitles</span>
                </div>
                <div className="episode-subtitles-title-column">
                    <img className="episode-subtitles-checkbox" src={showSubtitleTranslation ? checkboxChecked : checkbox} onClick={() => setShowSubtitleTranslation((prev) => !prev)} style={{filter: getFilter()}}/>
                    <span className="episode-subtitles-title">Translated</span>
                </div>
            </div>
            <div className="episode-subtitles-subtitle-container" ref={containerRef}>
                {subtitleJSX}
            </div>
        </div>
    )
}

export default EpisodeSubtitles