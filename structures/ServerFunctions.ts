import database, {genres} from "../json/database"
import S3 from "aws-sdk/clients/s3"

const s3 = new S3({region: "us-east-1", credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!
}})

export default class ServerFunctions {
    public static uploadFile = async (file: string, content: any) => {
        const upload = await s3.upload({Body: content, Key: file, Bucket: "cuteanime"}).promise()
        return upload.Location
    }

    public static deleteFile = async (file: string) => {
        await s3.deleteObject({Key: file, Bucket: "cuteanime"}).promise()
    }

    public static massDelete = async () => {
        let anime = database.slice()
        console.log(anime.length)
        for (let i = 0; i < anime.length; i++) {
            const id = anime[i].id
            console.log(id)
            const title = anime[i].title
            const coverKey = `${id}/cover/${title}.jpg`
            await ServerFunctions.deleteFile(coverKey).catch((e) => console.log(e))
            let episodeNames = [...Array.from({length: anime[i].episodeCount}, (_, i) => i + 1), ...Array.from({length: anime[i].ovaCount}, (_, i) => `OVA ${i + 1}`)]
            for (let j = 0; j < anime[i].episodeCount + anime[i].ovaCount; j++) {
                const episode = episodeNames[j]
                const thumbnailKey = `${id}/thumbnails/${title} ${episode}.jpg`
                const videoKey = `${id}/videos/${title} ${episode}.mp4`
                const japaneseKey = `${id}/japanese/${title} ${episode}.vtt`
                const englishKey = `${id}/english/${title} ${episode}.vtt`
                await ServerFunctions.deleteFile(thumbnailKey).catch((e) => console.log(e))
                await ServerFunctions.deleteFile(englishKey).catch((e) => console.log(e))
                await ServerFunctions.deleteFile(japaneseKey).catch((e) => console.log(e))
                await ServerFunctions.deleteFile(videoKey).catch((e) => console.log(e))
            }
        }
        console.log("done")
    }
}