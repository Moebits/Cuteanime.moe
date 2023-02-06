import React, {useState} from "react"

export const EnableDragContext = React.createContext<any>(null)
export const PageContext = React.createContext<any>(null)
export const NumPagesFlagContext = React.createContext<any>(null)
export const ZoomContext = React.createContext<any>(null)
export const ShowEnContext = React.createContext<any>(null)
export const HorizontalContext = React.createContext<any>(null)
export const ShowThumbnailsContext = React.createContext<any>(null)
export const NavigateFlagContext = React.createContext<any>(null)
export const DonationFlagContext = React.createContext<any>(null)
export const SidebarSortContext = React.createContext<any>(null)
export const SortContext = React.createContext<any>(null)
export const GenreContext = React.createContext<any>(null)
export const SearchContext = React.createContext<any>(null)
export const SearchFlagContext = React.createContext<any>(null)
export const ReverseContext = React.createContext<any>(null)
export const SiteHueContext = React.createContext<any>(null)
export const SiteSaturationContext = React.createContext<any>(null)
export const SiteLightnessContext = React.createContext<any>(null)
export const SiteColorChangeContext = React.createContext<any>(null)
export const MobileContext = React.createContext<any>(null)
export const JapaneseCuesContext = React.createContext<any>(null)
export const EnglishCuesContext = React.createContext<any>(null)
export const SubtitleIndexJAContext = React.createContext<any>(null)
export const SubtitleIndexENContext = React.createContext<any>(null)
export const JumpFlagContext = React.createContext<any>(null)

export const BrightnessContext = React.createContext<any>(null)
export const ContrastContext = React.createContext<any>(null)
export const HueContext = React.createContext<any>(null)
export const SaturationContext = React.createContext<any>(null)
export const LightnessContext = React.createContext<any>(null)
export const BlurContext = React.createContext<any>(null)
export const SharpenContext = React.createContext<any>(null)
export const PixelateContext = React.createContext<any>(null)
export const InvertContext = React.createContext<any>(null)

export const SpeedContext = React.createContext<any>(null)

const Context: React.FunctionComponent = (props) => {
    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)
    const [hue, setHue] = useState(180)
    const [saturation, setSaturation] = useState(100)
    const [lightness, setLightness] = useState(100)
    const [blur, setBlur] = useState(0)
    const [sharpen, setSharpen] = useState(0)
    const [pixelate, setPixelate] = useState(1)
    const [invert, setInvert] = useState(false)
    const [page, setPage] = useState("1")
    const [zoom, setZoom] = useState("100%")
    const [numPagesFlag, setNumPagesFlag] = useState(1)
    const [showEn, setShowEn] = useState(false)
    const [horizontal, setHorizontal] = useState(false)
    const [showThumbnails, setShowThumbnails] = useState(false)
    const [navigateFlag, setNavigateFlag] = useState(null)
    const [donationFlag, setDonationFlag] = useState(null)
    const [sort, setSort] = useState("date")
    const [sidebarSort, setSidebarSort] = useState("recent")
    const [genre, setGenre] = useState("")
    const [search, setSearch] = useState("")
    const [searchFlag, setSearchFlag] = useState(false)
    const [reverse, setReverse] = useState(false)
    const [siteHue, setSiteHue] = useState(180)
    const [siteSaturation, setSiteSaturation] = useState(100)
    const [siteLightness, setSiteLightness] = useState(50)
    const [japaneseCues, setJapaneseCues] = useState(null) as any
    const [englishCues, setEnglishCues] = useState(null) as any
    const [subtitleIndexJA, setSubtitleIndexJA] = useState(0)
    const [subtitleIndexEN, setSubtitleIndexEN] = useState(0)
    const [jumpFlag, setJumpFlag] = useState(null)
    const [siteColorChange, setSiteColorChange] = useState(false)
    const [speed, setSpeed] = useState(1)
    return (
        <>  
            <InvertContext.Provider value={{invert, setInvert}}>
            <SiteColorChangeContext.Provider value={{siteColorChange, setSiteColorChange}}>
            <JumpFlagContext.Provider value={{jumpFlag, setJumpFlag}}>
            <SubtitleIndexENContext.Provider value={{subtitleIndexEN, setSubtitleIndexEN}}>
            <SubtitleIndexJAContext.Provider value={{subtitleIndexJA, setSubtitleIndexJA}}>
            <EnglishCuesContext.Provider value={{englishCues, setEnglishCues}}>
            <JapaneseCuesContext.Provider value={{japaneseCues, setJapaneseCues}}>
            <PixelateContext.Provider value={{pixelate, setPixelate}}>
            <BrightnessContext.Provider value={{brightness, setBrightness}}>
            <ContrastContext.Provider value={{contrast, setContrast}}>
            <HueContext.Provider value={{hue, setHue}}>
            <SaturationContext.Provider value={{saturation, setSaturation}}>
            <LightnessContext.Provider value={{lightness, setLightness}}>
            <BlurContext.Provider value={{blur, setBlur}}>
            <SharpenContext.Provider value={{sharpen, setSharpen}}>
            <SpeedContext.Provider value={{speed, setSpeed}}>
            <SiteLightnessContext.Provider value={{siteLightness, setSiteLightness}}>
            <SiteSaturationContext.Provider value={{siteSaturation, setSiteSaturation}}>
            <SiteHueContext.Provider value={{siteHue, setSiteHue}}>
            <ReverseContext.Provider value={{reverse, setReverse}}>
            <GenreContext.Provider value={{genre, setGenre}}>
            <SearchFlagContext.Provider value={{searchFlag, setSearchFlag}}>
            <SearchContext.Provider value={{search, setSearch}}>
            <SidebarSortContext.Provider value={{sidebarSort, setSidebarSort}}>
            <SortContext.Provider value={{sort, setSort}}>
            <DonationFlagContext.Provider value={{donationFlag, setDonationFlag}}>
            <NavigateFlagContext.Provider value={{navigateFlag, setNavigateFlag}}>
            <ShowThumbnailsContext.Provider value={{showThumbnails, setShowThumbnails}}>
            <HorizontalContext.Provider value={{horizontal, setHorizontal}}>
            <ShowEnContext.Provider value={{showEn, setShowEn}}>
            <NumPagesFlagContext.Provider value={{numPagesFlag, setNumPagesFlag}}>
            <ZoomContext.Provider value={{zoom, setZoom}}>
            <PageContext.Provider value={{page, setPage}}>
                {props.children}
            </PageContext.Provider>
            </ZoomContext.Provider>
            </NumPagesFlagContext.Provider>
            </ShowEnContext.Provider>
            </HorizontalContext.Provider>
            </ShowThumbnailsContext.Provider>
            </NavigateFlagContext.Provider>
            </DonationFlagContext.Provider>
            </SortContext.Provider>
            </SidebarSortContext.Provider>
            </SearchContext.Provider>
            </SearchFlagContext.Provider>
            </GenreContext.Provider>
            </ReverseContext.Provider>
            </SiteHueContext.Provider>
            </SiteSaturationContext.Provider>
            </SiteLightnessContext.Provider>
            </SpeedContext.Provider>
            </SharpenContext.Provider>
            </BlurContext.Provider>
            </LightnessContext.Provider>
            </SaturationContext.Provider>
            </HueContext.Provider>
            </ContrastContext.Provider>
            </BrightnessContext.Provider>
            </PixelateContext.Provider>
            </JapaneseCuesContext.Provider>
            </EnglishCuesContext.Provider>
            </SubtitleIndexJAContext.Provider>
            </SubtitleIndexENContext.Provider>
            </JumpFlagContext.Provider>
            </SiteColorChangeContext.Provider>
            </InvertContext.Provider>
        </>
    )
}

export default Context