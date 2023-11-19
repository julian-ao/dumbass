require('dotenv').config({ path: '../../.env' })

const axios = require('axios')
const Artist = require('../models/Artist')
const connectDB = require('../config/db')

connectDB()

const BEARER_TOKEN = process.env.BEARER_TOKEN

async function fetchAndAddArtist(artistId) {
    try {
        // Check if the artist already exists in the database
        const existingArtist = await Artist.findOne({ id: artistId })
        if (existingArtist) {
            console.log(
                '\x1b[33m%s\x1b[0m', // Yellow color
                `Artist with ID ${artistId} already exists in the database.`
            )
            return
        }

        // Fetch artist from api.genius.com
        const response = await axios.get(
            `https://api.genius.com/artists/${artistId}`,
            {
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`
                }
            }
        )

        const artistData = response.data.response.artist

        // Check if the artist's image is a default avatar, and if so, return early
        if (artistData.image_url.includes('default_avatar')) {
            console.log(
                '\x1b[31m%s\x1b[0m', // Red color
                `Artist with ID ${artistId} has a default avatar, not adding to database.`
            )
            return
        }

        const descriptionChildren = artistData.description.dom.children
        const descriptionParagraphs = []

        // Get all the paragraphs from the description
        for (const child of descriptionChildren) {
            if (child.tag === 'p') {
                descriptionParagraphs.push(extractText(child.children))
            }
        }

        // Check if the description is empty, and if so, return early
        const descriptionText = descriptionParagraphs.join(' ')
        if (descriptionText.trim() === '?') {
            console.log(
                '\x1b[31m%s\x1b[0m', // Red color
                `Artist with ID ${artistId} has an empty description, not adding to database.`
            )
            return
        }

        // Construct the artist object
        const artist = new Artist({
            id: artistData.id,
            alternate_names: artistData.alternate_names,
            description: descriptionParagraphs,
            image_url: artistData.image_url,
            name: artistData.name,
            average_rating: 0.0,
            number_of_ratings: 0
        })

        // Save the artist to the database
        await artist.save()
        console.log(
            '\x1b[32m%s\x1b[0m', // Green color
            `Artist ${artistData.name} added to the database.`
        )
    } catch (error) {
        console.error(
            '\x1b[31m%s\x1b[0m', // Red color
            `Error fetching artist with ID ${artistId}:`,
            error.message
        )
    }
}

function extractText(children) {
    let text = ''

    // Iterate over each child
    for (const child of children) {
        if (typeof child === 'string') {
            text += child
        } else if (child && child.children) {
            text += extractText(child.children)
        }
    }

    return text
}

async function fetchAllArtists(startId, endId) {
    for (let i = startId; i <= endId; i++) {
        await fetchAndAddArtist(i)

        // Wait before fetching the next artist
        /* await new Promise((resolve) => setTimeout(resolve, 10)) */
    }
}

const startArtistId = 40000
const endArtistId = 60000
fetchAllArtists(startArtistId, endArtistId)
