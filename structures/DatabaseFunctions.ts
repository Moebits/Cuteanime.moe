import database, {genres} from "../json/database"
import functions from "./Functions"

export default class DatabaseFunctions {
    public static getRecent = () => {
        const recent = database.sort((a, b) => Date.parse(a.added) < Date.parse(b.added) ? 1 : -1)
        return recent.map((m) => ({title: m.title, id: m.id}))
    }

    public static getGenres = () => {
        return genres
    }

    public static logGenres = () => {
        let genreList = [] as any 
        for (let i = 0; i < database.length; i++) {
            genreList.push(...database[i].genres)
        }
        genreList = functions.removeDuplicates(genreList)
        let str = "["
        for (let i = 0; i < genreList.length; i++) {
            str += `"${genreList[i]}"`
            if (i < genreList.length - 1) str += ", "
        }
        str += "]"
        console.log(str)
    }

    public static getSorted = (query: string, genre: string, sort: string, reverse: boolean) => {
        let anime = database.slice()
        if (query) anime = anime.filter((m) => {
            if (m.title.toLowerCase().includes(query.trim().toLowerCase())) return true 
            return false
        })
        if (genre) anime = anime.filter((m) => {
            if (m.genres.includes(genre)) return true
            return false
        })
        if (sort === "alphabetic") {
            anime = anime.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sort === "bookmarks") {
            let bookmarkStr = localStorage.getItem("bookmarks")
            if (!bookmarkStr) bookmarkStr = "{}"
            const bookmarks = JSON.parse(bookmarkStr)
            anime = anime.filter((m) => {
                if (bookmarks[m.id] === true) return true 
                return false
            })
        } else if (sort === "difficulty") {
            anime = anime.sort((a, b) => a.difficulty < b.difficulty ? 1 : -1)
        } else {
            anime = anime.sort((a, b) => Date.parse(a.added) < Date.parse(b.added) ? 1 : -1)
        }
        if (reverse) anime = anime.reverse()
        return anime
    }
}