import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext, DonationFlagContext, MobileContext} from "../Context"
import functions from "../structures/Functions"
import tos from "../assets/icons/tos.png"
import contact from "../assets/icons/contact.png"
import code from "../assets/icons/code.png"
import donate from "../assets/icons/donate.png"
import pack from "../package.json"
import "./styles/footer.less"

const Footer: React.FunctionComponent = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {donationFlag, setDonationFlag} = useContext(DonationFlagContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const history = useHistory()

    const getFilter = () => {
        if (typeof window === "undefined") return
        const bodyStyles = window.getComputedStyle(document.body)
        const color = bodyStyles.getPropertyValue("--gridButton")
        return functions.calculateFilter(color)
    }

    return (
        <div className="footer">
            <div className="footer-row">
                <div className="footer-links-container">
                    <div className="footer-link-box" onClick={() => history.push(`/`)}>
                        <span className="footer-link-text-big">CuteAnime</span>
                    </div>
                    <div className="footer-link-box" onClick={() => history.push(`/tos`)}>
                        <img className="footer-link-img" src={tos} style={{filter: getFilter()}}/>
                        {!mobile ? <span className="footer-link-text">TOS/Privacy Policy</span> : null}
                    </div>
                    <div className="footer-link-box" onClick={() => window.open("mailto:cutemanga.moe@gmail.com")}>
                        <img className="footer-link-img" src={contact}  style={{filter: getFilter()}}/>
                        {!mobile ? <span className="footer-link-text">Contact</span> : null}
                    </div>
                    <div className="footer-link-box" onClick={() => window.open(pack.repository.url, "_blank")}>
                        <img className="footer-link-img" src={code}  style={{filter: getFilter()}}/>
                        {!mobile ? <span className="footer-link-text">Website Code</span> : null}
                    </div>
                    <div className="footer-link-box" onClick={() => setDonationFlag(true)}>
                        <img className="footer-link-img" src={donate} style={{filter: getFilter()}}/>
                        {!mobile ? <span className="footer-link-text">Donate</span> : null}
                    </div>
                </div>
                <span className="footer-link-text-small">©{new Date().getFullYear()} CuteAnime</span>
            </div>
            <div className="footer-row">
                <span className="footer-text">
                    Disclaimer: This website is for educational purposes only (studying Japanese). 
                    We do not own any anime and we do not profit off of them. If you like a anime then support the studio/publisher by buying it. 
                    If you are a studio/publisher and want your content removed, contact us.
                </span>
            </div>
        </div>
    )
}

export default Footer