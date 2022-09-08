import React, {useEffect, useContext, useState} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import functions from "../structures/Functions"
import {EnableDragContext, DonationFlagContext, MobileContext} from "../Context"
import Draggable from "react-draggable"
import copy from "../assets/icons/copy.png"
import "./styles/donationdialog.less"
import axios from "axios"

const DonationDialog: React.FunctionComponent = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {donationFlag, setDonationFlag} = useContext(DonationFlagContext)
    const {mobile, setMobile} = useContext(MobileContext)
    const history = useHistory()
    const btc = "3AkW6zDjnuGkecGXdVmtNSRQrVcyZcobBx"

    const getFilter = () => {
        if (typeof window === "undefined") return
        const bodyStyles = window.getComputedStyle(document.body)
        const color = bodyStyles.getPropertyValue("--gridButton")
        return functions.calculateFilter(color)
    }

    useEffect(() => {
        document.title = "Donation"
    }, [])

    useEffect(() => {
        if (donationFlag) {
            document.body.style.pointerEvents = "none"
        } else {
            document.body.style.pointerEvents = "all"
            setEnableDrag(true)
        }
    }, [donationFlag])

    const click = () => {
        setDonationFlag(false)
    }

    const triggerCopy = () => {
        navigator.clipboard.writeText(btc)
    }

    if (donationFlag) {
        return (
            <div className="donation-dialog">
                <Draggable handle=".donation-dialog-title-container">
                <div className="donation-dialog-box" onMouseEnter={() => setEnableDrag(false)} onMouseLeave={() => setEnableDrag(true)}>
                    <div className="donation-container">
                        <div className="donation-dialog-title-container">
                            <span className="donation-dialog-title">Donation</span>
                        </div>
                        <div className="donation-dialog-row">
                            <span className="donation-dialog-text">Donations are used to help me maintain server costs and keep the site up. Thank you for supporting me!</span>
                        </div>
                        <div className="donation-dialog-row">
                            <span className="donation-dialog-coin">Bitcoin:</span>
                            <div className="donation-dialog-address">{btc}</div>
                            {!mobile ? <img className="donation-dialog-icon" src={copy} style={{filter: getFilter()}} onClick={() => triggerCopy()}/> : null}
                        </div>
                        <div className="donation-dialog-row">
                            <button onClick={() => click()} className="donation-button">{"Ok"}</button>
                        </div>
                    </div>
                </div>
                </Draggable>
            </div>
        )
    }
    return null
}

export default DonationDialog