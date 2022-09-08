import React, {useContext, useEffect, useState, useReducer} from "react"
import TitleBar from "../components/TitleBar"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import tos from "../assets/icons/terms.png"
import privacy from "../assets/icons/privacy.png"
import functions from "../structures/Functions"
import DonationDialog from "../dialogs/DonationDialog"
import {EnableDragContext} from "../Context"
import "./styles/tospage.less"

const TermsPage: React.FunctionComponent = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const [onPrivacy, setOnPrivacy] = useState(false)

    const getFilter = () => {
        if (typeof window === "undefined") return
        const bodyStyles = window.getComputedStyle(document.body)
        const color = bodyStyles.getPropertyValue("--gridButton")
        return functions.calculateFilter(color)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        document.title = "TOS/Privacy Policy"
    })
    
    return (
        <>
        <DonationDialog/>
        <TitleBar rerender={forceUpdate}/>
        <div className="body">
            <div className="content" onMouseEnter={() => setEnableDrag(true)}>
                <div className="terms-container">
                    <div className="terms">
                        <div className="terms-title-container">
                            <img className="terms-img" src={tos} style={{filter: getFilter()}}/>
                            <span className="terms-title">Terms of Service</span>
                        </div>
                        <div className="terms-text">
                            Last Updated: September 2, 2022 <br/><br/>

                            This Terms of Service applies to the website ("site") provided 
                            by CuteAnime (”we”, “us”, “our”). By using our site, you agree with these terms. If you do not agree with these 
                            terms, you may not use our site.<br/><br/>
                            
                            Prohibited Actions<br/>
                            When you are using our site, you may not do any of the following: <br/>
                            <span className="terms-text-alt">
                            ⇾ Attempt to disrupt, overburden, or otherwise impair the operation of our servers.<br/><br/>
                            </span>

                            Copyright Infringement and DMCA Takedowns<br/>
                            We respect the intellectual property of others. If you are a copyright holder 
                            and want your content removed from our site, you can contact us 
                            and provide the following pieces of information:<br/>
                            <span className="terms-text-alt">
                            ⇾ Contact information (Name, Mailing Address, Phone Number, Email)<br/>
                            ⇾ Proof of your identity<br/>
                            ⇾ Links to the infringing content<br/>
                            ⇾ A statement affirming that you are the copyright holder of the content in question<br/>
                            </span><br/>

                            Liability<br/>
                            The site is provided "as is", without warranty of any kind, express or implied. 
                            In no event shall we be liable for any claim, damages or other liability, arising from 
                            or in connection with usage of our site.<br/><br/>

                            Changes to these Terms<br/>
                            We may make changes to these terms at any time, indicated by its 
                            “Last Updated” date. Changes to the terms are effective immediately and by using
                            our site after the terms are revised, you are agreeing to the revised terms.
                        </div>
                    </div>
                    <div className="privacy" id="privacy" onMouseOver={() => setOnPrivacy(true)} onMouseLeave={() => setOnPrivacy(false)}>
                        <div className="privacy-title-container">
                            <img className="privacy-img" src={privacy} style={{filter: getFilter()}}/>
                            <span className="privacy-title">Privacy Policy</span>
                        </div>
                        <div className="privacy-text">
                            Last Updated: September 2, 2022<br/><br/>

                            This Privacy Policy outlines the information that CuteAnime (”we”, “us”, “our”) 
                            collects when you use our website ("site"). It also describes how we use your 
                            information and how your information is shared. <br/><br/>

                            We automatically collect information when you access our service, 
                            which includes:<br/><br/>

                            <span className="privacy-text-alt">Log and Usage Data</span> - We may log information when you access our services 
                            which may include your IP Address, device information, pages visited, requested URL,
                            and search terms.<br/><br/>

                            <span className="privacy-text-alt">Cookies</span> - Cookies are used to maintain your 
                            session and preferences.<br/><br/>

                            How We Use Your Information<br/>
                            We use your information in order to:<br/>
                            <span className="privacy-text-alt">
                            ⇾ Provide and improve our site's functionality.<br/>
                            ⇾ Protect our site from abuse and spam.<br/>
                            ⇾ Analyze usage data in connection with our site.<br/><br/>
                            </span>

                            We do not share personal information with third parties unless one of
                            the following holds:<br/>
                            <span className="privacy-text-alt">
                            ⇾ We have your consent.<br/>
                            ⇾ It is aggregated and anomalyzed in a way that can’t be traced back to you.<br/>
                            ⇾ It is required to comply with the law.<br/><br/>
                            </span>

                            Changes to this Policy<br/>
                            We may make changes to this policy at any time, indicated by its
                            “Last Updated” date. Changes to this policy are effective immediately
                            and by continuing to use our site after the policy is revised, you
                            are agreeing to the revised policy.
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}

export default TermsPage