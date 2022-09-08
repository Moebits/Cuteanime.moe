import React, {useEffect, useState, useContext, useReducer} from "react"
import {Switch, Route, Redirect, useHistory, useLocation} from "react-router-dom"
import Context, {EnableDragContext, MobileContext} from "./Context"
import axios from "axios"
import functions from "./structures/Functions"
import HomePage from "./pages/HomePage"
import AnimeInfoPage from "./pages/AnimeInfoPage"
import AnimePage from "./pages/AnimePage"
import AboutPage from "./pages/AboutPage"
import TermsPage from "./pages/TermsPage"
import $404Page from "./pages/404Page"
import "./index.less"

require.context("./assets/icons", true)

const App: React.FunctionComponent = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const [loaded, setLoaded] = useState(false)
    const [enableDrag, setEnableDrag] = useState(false)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 100)
    }, [])

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        setTimeout(() => {
            functions.dragScroll(enableDrag)
        }, 100)
    }, [enableDrag, history])

    useEffect(() => {
        const mobileQuery = (query: any) => {
            if (query.matches) {
                setMobile(true)
            } else {
                setMobile(false)
            }
        }
        const media = window.matchMedia("(max-width: 500px)")
        media.addEventListener("change", mobileQuery)
        mobileQuery(media)
        document.documentElement.style.visibility = "visible"
    }, [])

    return (
        <div className={`app ${!loaded ? "stop-transitions" : ""}`}>
            <MobileContext.Provider value={{mobile, setMobile}}>
            <EnableDragContext.Provider value={{enableDrag, setEnableDrag}}>
                <Context>
                    <Switch>
                        <Route exact path={["/", "/home", "/anime"]}><HomePage/></Route>
                        <Route exact path="/anime/:id" render={(props) => <AnimeInfoPage {...props}/>}></Route>
                        <Route exact path="/anime/:id/:num" render={(props) => <AnimePage {...props}/>}></Route>
                        <Route exact path="/about"><AboutPage/></Route>
                        <Route exact path={["/tos", "/terms", "/privacy"]}><TermsPage/></Route>
                        <Route path="*"><$404Page/></Route>
                    </Switch>
                </Context>
            </EnableDragContext.Provider>
            </MobileContext.Provider>
        </div>
    )
}

export default App