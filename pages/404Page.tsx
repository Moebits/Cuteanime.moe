import React, {useEffect, useContext, useReducer} from "react"
import TitleBar from "../components/TitleBar"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import $404 from "../assets/images/404.png"
import "./styles/404page.less"

const $404Page: React.FunctionComponent = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        document.title = "404 Error"
    }, [])

    return (
        <>
        <TitleBar rerender={forceUpdate}/>
        <div className="body">
            <SideBar/>
            <div className="content">
                <div className="f404-container">
                    <span className="f404-text">404 Error</span>
                    <img className="f404" src={$404}/>
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}

export default $404Page