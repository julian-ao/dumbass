require('dotenv').config({ path: '../../.env' })

const axios = require('axios')
const Song = require('../models/Song')
const connectDB = require('../config/db')
const genius = require('genius-lyrics-api')

connectDB()

const BEARER_TOKEN = process.env.BEARER_TOKEN

async function fetchAndAddSong(songId) {
    try {
        // Check if the song already exists in the database
        const existingSong = await Song.findOne({ id: songId })

        if (existingSong) {
            console.log(
                '\x1b[31m%s\x1b[0m', // Red color
                `Song with ID ${songId} already exists in DB.`
            )
            return
        }

        // Fetch song from Genius API
        const response = await axios.get(
            `https://api.genius.com/songs/${songId}`,
            {
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`
                }
            }
        )

        const songData = response.data.response.song

        const options = {
            apiKey: process.env.BEARER_TOKEN,
            title: songData.title,
            artist: songData.artist_names,
            optimizeQuery: true
        }

        const song_lyrics = await genius.getLyrics(options).catch((err) => {
            console.error(
                '\x1b[31m%s\x1b[0m', // Red color
                `Error fetching lyrics for song with ID ${songId}:`,
                err.message
            )
            throw new Error('Lyrics fetching error')
        })

        const descriptionChildren = songData.description.dom.children
        const descriptionParagraphs = []

        // Get all the paragraphs from the description
        for (const child of descriptionChildren) {
            if (child.tag === 'p') {
                descriptionParagraphs.push(extractText(child.children))
            }
        }
        if (songData.release_date === null) {
            console.log(
                '\x1b[31m%s\x1b[0m', // Red color
                `Song with ID ${songId} has a null release date, not adding to database.`
            )
            return
        }

        // Construct the song object
        const song = new Song({
            id: songData.id,
            artist_names: songData.artist_names,
            description: descriptionParagraphs,
            header_image_url: songData.header_image_url,
            release_date: songData.release_date,
            title: songData.title,
            primary_artist_id: songData.primary_artist.id,
            average_rating: 0.0,
            number_of_ratings: 0,
            lyrics: song_lyrics
        })

        // Save the song to the database
        await song.save()
        console.log(
            '\x1b[32m%s\x1b[0m', // Green color
            `Song ${songData.title} added to the database.`
        )
    } catch (error) {
        console.error(
            '\x1b[31m%s\x1b[0m', // Red color
            `Error fetching song with ID ${songId}:`,
            error.message
        )
    }
}

function extractText(children) {
    let text = ''

    for (const child of children) {
        if (typeof child === 'string') {
            text += child
        } else if (child && child.children) {
            text += extractText(child.children)
        }
    }

    return text
}

async function fetchAllSongs(startId, endId) {
    for (let i = startId; i <= endId; i++) {
        await fetchAndAddSong(i)
    }
}

const startSongId = 10184
const endSongId = 20000
fetchAllSongs(startSongId, endSongId)
