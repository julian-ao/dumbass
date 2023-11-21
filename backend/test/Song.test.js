const supertest = require('supertest')
const { app, server } = require('../index.js')
const { closeDatabaseConnection } = require('../config/db.js')
const Song = require('../models/Song')
const User = require('../models/User')
const Review = require('../models/Review')

jest.mock('../models/Song', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    countDocuments: jest.fn()
}))

jest.mock('../models/Review', () => ({
    find: jest.fn(),
    findOne: jest.fn()
}))

jest.mock('../models/User', () => ({
    findOne: jest.fn(),
    findById: jest.fn()
}))

beforeEach(() => {
    jest.clearAllMocks()

    Song.find = jest.fn().mockReturnThis()
    Song.sort = jest.fn().mockReturnThis()
    Song.skip = jest.fn().mockReturnThis()
    Song.limit = jest.fn().mockImplementation(() =>
        Promise.resolve([
            {
                artist_names: 'Artist 1',
                description: [
                    'Description of the song 1',
                    'More about the song'
                ],
                header_image_url: 'http://example.com/song1-image.jpg',
                id: 1,
                release_date: '2023-01-01',
                title: 'Song Title 1',
                primary_artist_id: 101,
                average_rating: 4.5,
                number_of_ratings: 200,
                lyrics: 'Lyrics of song 1'
            },
            {
                artist_names: 'Artist 2',
                description: [
                    'Description of the song 2',
                    'More about the song'
                ],
                header_image_url: 'http://example.com/song2-image.jpg',
                id: 2,
                release_date: '2023-01-02',
                title: 'Song Title 2',
                primary_artist_id: 102,
                average_rating: 4.0,
                number_of_ratings: 150,
                lyrics: 'Lyrics of song 2'
            }
        ])
    )
    Song.findOne.mockImplementation((query) => {
        if (query && query.id === 1) {
            return Promise.resolve({
                artist_names: 'Artist 1',
                description: [
                    'Description of the song 1',
                    'More about the song'
                ],
                header_image_url: 'http://example.com/song1-image.jpg',
                id: 1,
                release_date: '2023-01-01',
                title: 'Song Title 1',
                primary_artist_id: 101,
                average_rating: 4.5,
                number_of_ratings: 200,
                lyrics: 'Lyrics of song 1'
            })
        } else {
            return Promise.reject(
                new Error(`Song with id ${query.id} not found.`)
            )
        }
    })
    Song.countDocuments = jest.fn().mockImplementation((query) => {
        if (query && query.title) {
            return Promise.resolve(2)
        } else {
            return Promise.resolve(0)
        }
    })

    User.findOne.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
        favorites: [
            {
                type: 'song',
                targetId: 1
            }
        ]
    })
    User.findById.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
        favorites: [
            {
                type: 'song',
                targetId: 1
            }
        ]
    })

    Review.find = jest.fn().mockImplementation((query) => {
        const mockReviews = [
            {
                username: 'testuser',
                content: 'Comment 1',
                rating: 4.5,
                targetType: 'song',
                targetId: 1
            },
            {
                username: 'testuser',
                content: 'Comment 2',
                rating: 4.5,
                targetType: 'song',
                targetId: 1
            }
        ]

        if (query && query.targetType && query.targetId) {
            return Promise.resolve(
                mockReviews.filter(
                    (review) =>
                        review.targetType === query.targetType &&
                        review.targetId === query.targetId
                )
            )
        }
        return Promise.resolve(mockReviews)
    })

    Review.findOne.mockResolvedValue({
        username: 'testuser',
        content: 'Comment 1',
        rating: 4.5,
        targetType: 'song',
        targetId: 1
    })
})

afterAll(async () => {
    await closeDatabaseConnection()
    server.close()
})

describe('Song rootQuery test', () => {
    describe('returns status 200 on correct gql queries and correct data', () => {
        test('getSongById', async () => {
            const query = {
                query: `
                    query GetSongById($id: ID!) {
                        getSongById(id: $id) {
                            title
                            lyrics
                        }
                    }
                `,
                variables: { id: 1 }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.data.getSongById).toBeDefined()
            expect(response.body.data.getSongById.title).toBe('Song Title 1')
            expect(response.body.data.getSongById.lyrics).toBe(
                'Lyrics of song 1'
            )
        })

        test('getReviewsByTarget', async () => {
            const query = {
                query: `
                    query GetReviewsByTarget($targetType: String!, $targetId: Int!) {
                        getReviewsByTarget(targetType: $targetType, targetId: $targetId) {
                            content
                            rating
                        }
                    }
                `,
                variables: { targetType: 'song', targetId: 1 }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.data.getReviewsByTarget).toBeInstanceOf(Array)
            expect(response.body.data.getReviewsByTarget).toHaveLength(2)
            expect(response.body.data.getReviewsByTarget[0].content).toBe(
                'Comment 1'
            )
            expect(response.body.data.getReviewsByTarget[0].rating).toBe(4.5)
            expect(response.body.data.getReviewsByTarget[1].content).toBe(
                'Comment 2'
            )
            expect(response.body.data.getReviewsByTarget[1].rating).toBe(4.5)
        })

        test('searchSearchbar', async () => {
            const query = {
                query: `
                    query SearchSearchbar($searchString: String!, $searchType: String!, $limit: Int) {
                        searchSearchbar(searchString: $searchString, searchType: $searchType, limit: $limit) {
                            ... on Song {
                                title
                                average_rating
                            }
                        }
                    }
                `,
                variables: {
                    searchString: 'Song',
                    searchType: 'song',
                    limit: 2
                }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.data.searchSearchbar).toBeInstanceOf(Array)
            expect(
                response.body.data.searchSearchbar.length
            ).toBeLessThanOrEqual(2)
        })

        test('getSongsOnTitle', async () => {
            const query = {
                query: `
                    query GetSongsOnTitle($title: String!, $sort: String!, $limit: Int, $page: Int) {
                        getSongsOnTitle(title: $title, sort: $sort, limit: $limit, page: $page) {
                            title
                            average_rating
                        }
                    }
                `,
                variables: {
                    title: 'Song Title',
                    sort: 'rating',
                    limit: 2,
                    page: 1
                }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.data.getSongsOnTitle).toBeInstanceOf(Array)
            let previousRating = Infinity
            response.body.data.getSongsOnTitle.forEach((song) => {
                expect(song.title).toMatch(/Song Title /i)
                expect(song.average_rating).toBeLessThanOrEqual(previousRating)
                previousRating = song.average_rating
            })
        })

        test('countSongs', async () => {
            const query = {
                query: `
                    query CountSongs($title: String!) {
                        countSongs(title: $title)
                    }
                `,
                variables: { title: 'Song' }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.data.countSongs).toBeDefined()
            expect(typeof response.body.data.countSongs).toBe('number')
            expect(response.body.data.countSongs).toBe(2)
        })

        test('checkIfFavourite', async () => {
            const queryTrue = {
                query: `
                    query CheckIfFavorite($username: String!, $type: String!, $targetId: Int!) {
                        checkIfFavorite(username: $username, type: $type, targetId: $targetId)
                    }
                `,
                variables: { username: 'testuser', type: 'song', targetId: 1 }
            }

            const queryFalse = {
                query: `
                    query CheckIfFavorite($username: String!, $type: String!, $targetId: Int!) {
                        checkIfFavorite(username: $username, type: $type, targetId: $targetId)
                    }
                `,
                variables: { username: 'testuser', type: 'song', targetId: 3 }
            }

            const responseTrue = await supertest(app)
                .post('/graphql')
                .send(queryTrue)

            expect(responseTrue.status).toBe(200)
            expect(responseTrue.body.data.checkIfFavorite).toBe(true)

            const responseFalse = await supertest(app)
                .post('/graphql')
                .send(queryFalse)

            expect(responseFalse.status).toBe(200)
            expect(responseFalse.body.data.checkIfFavorite).toBe(false)
        })

        test('getFavourites', async () => {
            const query = {
                query: `
                    query GetFavorites($username: String!) {
                        getFavorites(username: $username) {
                            type
                            targetId
                        }
                    }
                `,
                variables: { username: 'testuser' }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.data.getFavorites).toBeInstanceOf(Array)
            expect(response.body.data.getFavorites).toHaveLength(1)
            expect(response.body.data.getFavorites[0].type).toBeDefined()
            expect(response.body.data.getFavorites[0].targetId).toBeDefined()
        })
    })

    describe('return error in the body on incorrect data/query', () => {
        test('getSongById', async () => {
            const query = {
                query: `
                    query GetSongById($id: ID!) {
                        getSongById(id: $id) {
                            title
                            lyrics
                        }
                    }
                `,
                variables: { id: 2 }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.errors).toBeDefined()
        })

        test('searchSearchbar', async () => {
            const query = {
                query: `
                    query SearchSearchbar($searchString: String!, $searchType: String!, $limit: Int) {
                        searchSearchbar(searchString: $searchString, searchType: $searchType, limit: $limit) {
                            ... on Song {
                                title
                                average_rating
                            }
                        }
                    }
                `,
                variables: {
                    searchString: 'Invalid Search',
                    searchType: 'invalidType',
                    limit: 2
                }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.errors).toBeDefined()
            expect(response.body.data.searchSearchbar).toEqual([null, null])
        })

        test('getSongsOnTitle', async () => {
            const query = {
                query: `
                    query GetSongsOnTitle($sort: String!, $limit: Int, $page: Int) {
                        getSongsOnTitle(sort: $sort, limit: $limit, page: $page) {
                            title
                            average_rating
                        }
                    }
                `,
                variables: { sort: 'rating', limit: 2, page: 1 }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
        })
    })
})
