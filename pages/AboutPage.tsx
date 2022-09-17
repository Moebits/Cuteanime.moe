import React, {useContext, useEffect, useState, useReducer} from "react"
import TitleBar from "../components/TitleBar"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import functions from "../structures/Functions"
import DonationDialog from "../dialogs/DonationDialog"
import {EnableDragContext} from "../Context"
import aboutImg from "../assets/images/about.png"
import switchingSubtitles from "../assets/images/switchingsubtitles.png"
import subtitlecatalog from "../assets/images/subtitlecatalog.png"
import nextDialogue from "../assets/images/nextdialogue.png"
import videoSpeed from "../assets/images/videospeed.png"
import abloop from "../assets/images/abloop.png"
import videoFilters from "../assets/images/videofilters.png"
import officialWebsiteImg from "../assets/images/officialwebsite.png"
import "./styles/aboutpage.less"

const AboutPage: React.FunctionComponent = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        document.title = "About"
    })
    
    return (
        <>
        <DonationDialog/>
        <TitleBar rerender={forceUpdate}/>
        <div className="body">
            <div className="content" onMouseEnter={() => setEnableDrag(true)}>
                <div className="about">
                    <div className="about-row">
                        <span className="about-title">About</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text">
                                CuteAnime is a website where you can watch anime with Japanese subtitles. It's a fun way to 
                                study Japanese with dictionary extensions such as <span className="about-link" onClick={() => window.open("https://chrome.google.com/webstore/detail/yomichan/ogmnaimimemjmbakcfefmnahgdfhfami?hl=en-US", "_blank")}>Yomichan </span>
                                and <span className="about-link" onClick={() => window.open("https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb?hl=en-US", "_blank")}>Google Translate</span>.<br/><br/>

                                The anime subtitles are usually retrieved from <span className="about-link" onClick={() => window.open("https://www.kitsunekko.net/dirlist.php?dir=subtitles%2Fjapanese%2F", "_blank")}>Kitsunekko</span> or 
                                <span className="about-link" onClick={() => window.open("https://itazuraneko.neocities.org/library/sub.html", "_blank")}> Itazuraneko</span>. In general, I won't be able to add any anime that doesn't 
                                have subtitles available on these sites (because it probably never had a release with Japanese subtitles, and I am not proficient enough at Japanese to create my own subtitles).
                        </span>
                    </div>
                    <div className="about-row">
                        <img className="about-img" src={aboutImg}/>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Study Guide</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text">
                            I recommend that you use the AnkiConnect extension with Yomichan and create decks for 
                            every episode that you watch. If you are not familiar with <span className="about-link" onClick={() => window.open("https://apps.ankiweb.net", "_blank")}>Anki </span> 
                            or <span className="about-link" onClick={() => window.open("https://ankiweb.net/shared/info/2055492159", "_blank")}>AnkiConnect</span>, you can read 
                            a guide <span className="about-link" onClick={() => window.open("https://djtguide.neocities.org/anki.html", "_blank")}>here</span>. Anki is a spaced repetition software that shows you flashcards when 
                            you are likely to have forgotten them. <br/><br/>

                            When you are reading add words that you do not know to the Anki deck for that episode 
                            (set in Yomichan settings). Your decks should look something Anime::Episode 1, Anime::Episode 2, etc. <br/><br/>

                            At first, you might need to add nearly everything and it might be overwhelming, but 
                            that is normal. As you learn more words you will find yourself adding less words and 
                            creating smaller decks. Also, by default AnkiConnect doesn’t allow duplicate notes, so it basically 
                            force you to create smaller decks even if you do not remember the word that was already added previously. <br/><br/>

                            To have an easier time recalling words, you should write them down especially since many Kanji are 
                            complex and you will remember them better if you go through the process of writing down every stroke. 
                            If you are having trouble with a particular Kanji’s stroke order, you should look up the Kanji on <span className="about-link" onClick={() => window.open("https://jisho.org", "_blank")}>Jisho</span>. <br/><br/>

                            If you are still having trouble, you can try taking a couple of words and writing down sentences with them. 
                            You can create your own sentences or simply use the dialogue from the anime where the word was used. <br/><br/>

                            Learning Japanese will be very hard at first, but it should become easier as you increase your vocabulary. Good luck!
                        </span>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Difficulty</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text">
                            Every show has a difficulty rating taken from <span className="about-link" onClick={() => window.open("https://jpdb.io/anime-difficulty-list", "_blank")}>jpdb.io</span> which measures the 
                            approximate difficulty of the show from 1-10. Shows scored from 1-3 are good for beginners (these are usually slice of life anime or shows aimed at a younger audience). Shows rated from 4-6 are 
                            better for intermediate learners (most anime will probably fall into this range). And finally, anime rated from 7-10 are extremely difficult and watching anime at this 
                            level is only recommended to advanced learners (expect there to be lengthy dialogue with lots of unique words and obscure kanji). <br/><br/>

                            Do note that at the bare minimum you should know Hiragana, Katakana, some basic grammar, and some vocabulary, so almost no anime is going to be easy for complete beginners. If you are a 
                            complete beginner you should study the above first and come back later.
                        </span>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Subtitle Resync</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text">
                            I make an effort to time the subtitles to the videos correctly since most of the subtitles on kitsu are out of sync (because they include commercial breaks). However, 
                            I do not check every single episode so if you find any videos with subtitles that are out of sync for more than 1-2 seconds you can contact me and I will attempt to retime 
                            that episode.
                        </span>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Switching Subtitles</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text">
                            You can toggle Japanese and/or English subtitles on and off with the "Sub" option in the video player. Since the Japanese and English subtitles 
                            are from different sources there might be a different amount of dialogue for each. Do note that all of the site functions (jumping to next/previous dialoges,
                            subtitle catalog) are going to be timed based on the Japanese subtitles. <br/><br/>

                            The Japanese subtitles do not have furigana so it is recommended that you use external extensions to figure out the meanings of difficult 
                            kanji. For best practices, you should only watch with the Japanese subtitles and only use the English subtitles as a reference to make sure you 
                            are understanding the dialogue correctly. If you constantly watch with both subtitles, you will become too reliant on the English subs and it will 
                            be detrimental to your learning. 
                        </span>
                    </div>
                    <div className="about-row">
                        <img className="about-img" src={switchingSubtitles}/>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Subtitle Catalog</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text"> 
                            The subtitle catalog contains a list of all the subtitles in the episode and you can quickly jump to a specific dialogue by clicking on the play marker before 
                            each subtitle. Another benefit of the subtitle catalog is that you also search through the entire script of an episode by using your browser's search function. This 
                            is useful to quickly find the dialogue in which specific words were used. <br/><br/>

                            You can toggle on English translations in the catalog by clicking on the checkbox that says "Translated". Once again it is best not to constantly rely on the 
                            English translations but to only use them as a quick reference when you need them. 
                        </span>
                    </div>
                    <div className="about-row">
                        <img className="about-img" src={subtitlecatalog}/>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Jumping to Next/Previous Dialogue</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text"> 
                            Often times, a character will be speaking much to fast for you to comprehend so it is very useful to quickly jump to the next/previous dialogues. 
                            You can do this by clicking on the arrow buttons on the side of the play button. <br/><br/>

                            You can also use the left/right arrow keys on your keyboard. This is the list of all keyboard shortcuts available:<br/>
                            Space - Play/Pause <br/>
                            Left Arrow - Previous Dialogue <br/>
                            Right Arrow - Next Dialogue <br/>
                            Up Arrow - Increase Volume <br/>
                            Down Arrow - Decrease Volume <br/><br/>
                        </span>
                    </div>
                    <div className="about-row">
                        <img className="about-img" src={nextDialogue}/>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Video Speed</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text"> 
                            If the characters are still speaking too fast for you, then it is useful to slow the video down to 0.75x or 0.5x speed. The two buttons in 
                            the video player right after the FX button let you control the playback speed and pitch preservement, respectively. The playback speed will 
                            let you either slow down or speed up a video. <br/><br/>

                            Pitch preservement controls whether or not the audio pitch will be changed along with the playback speed. If it is turned off, then the audio 
                            will be pitch corrected so that the pitch is the same as 1x speed when the speed is changed. It is recommended to leave this off as the characters 
                            are harder to understand if the audio pitch changes. 
                        </span>
                    </div>
                    <div className="about-row">
                        <img className="about-img" src={videoSpeed}/>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Looping from Point A to Point B</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text">
                            You can loop the video from a point A and point B defined by you by using the A-B option in the video player. By default, the A-B loop will begin at 
                            the current video position and it will end 5 seconds into the future. You can change the A-B loop regions by dragging the A button or B button where you 
                            need them. This option is useful whenever you want to repeat a difficult dialogue several times. 
                        </span>
                    </div>
                    <div className="about-row">
                        <img className="about-img" src={abloop}/>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Video Filters</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text"> 
                            *Note that this is a feature provided solely for entertainment purposes. You can apply filters to the video 
                            which includes but isn't limited to: brightness, contrast, sharpen, and pixelate. Sharpen is definitely the most useful fitler since it 
                            can make a video clearer if it's somewhat blurry/low quality. <br/><br/>
                        </span>
                    </div>
                    <div className="about-row">
                        <img className="about-img" src={videoFilters}/>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Official Website</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text">
                            There is a link to the official website where you will probably find links to buy the anime and/or manga. 
                            If you live outside of Japan and want to buy physical media you will have to use a proxy since they usually 
                            only ship domestically.
                        </span>
                    </div>
                    <div className="about-row">
                        <img className="about-img" src={officialWebsiteImg}/>
                    </div>
                    <div className="about-row">
                        <span className="about-title">Contact</span>
                    </div>
                    <div className="about-row">
                        <span className="about-text">
                            If you need to contact us for any reason send us an email at 
                            <span className="about-link" onClick={() => window.open("mailto:cutemanga.moe@gmail.com")}> cutemanga.moe@gmail.com</span>.  <br/><br/>

                            I hope that you enjoy watching anime and studying Japanese!
                        </span>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}

export default AboutPage