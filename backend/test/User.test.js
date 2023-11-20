const supertest = require('supertest')
const { app, server } = require('../index.js')
const { closeDatabaseConnection } = require('../config/db.js')
const User = require('../models/User')

jest.mock('../models/User', () => ({
    findOne: jest.fn(),
    findById: jest.fn()
}))

beforeEach(() => {
    jest.clearAllMocks()

    User.findById.mockImplementation((query) => {
        if (query === '1') {
            return Promise.resolve({
                username: 'testuser',
                password: 'testpassword',
                favorites: [
                    {
                        type: 'song',
                        targetId: 1
                    }
                ]
            })
        } else {
            return Promise.resolve(null)
        }
    })

    User.findOne = jest.fn().mockImplementation((query) => {
        if (query.username === 'testUser') {
            return Promise.resolve({
                username: 'testUser',
                password: 'testPassword',
                favorites: [
                    {
                        type: 'song',
                        targetId: 1
                    }
                ]
            })
        } else {
            return Promise.resolve(null)
        }
    })
})

afterAll(async () => {
    await closeDatabaseConnection()
    server.close()
})

describe('User rootQuery test', () => {
    describe('returns status 200 on correct gql queries and correct data', () => {
        test('getUser', async () => {
            const query = {
                query: `
                        query GetUser($id: ID!) {
                            getUser(id: $id) {
                                username
                                favorites {
                                    type
                                    targetId
                                }
                            }
                        }
                    `,
                variables: { id: 1 }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.data.getUser).toBeDefined()
            expect(response.body.data.getUser.username).toBe('testuser')
            expect(response.body.data.getUser.favorites).toBeInstanceOf(Array)
            expect(response.body.data.getUser.favorites).toHaveLength(1)
            expect(response.body.data.getUser.favorites[0].type).toBe('song')
            expect(response.body.data.getUser.favorites[0].targetId).toBe(1)
        })
    })

    describe('returns error in body on incorrect data/query', () => {
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
                variables: { username: 'nonexistentuser' }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.errors).toBeDefined()
            expect(response.body.errors[0].message).toContain('User not found')
        })

        test('getUser', async () => {
            const query = {
                query: `
                        query GetUser($id: ID!) {
                            getUser(id: $id) {
                                username
                            }
                        }
                    `,
                variables: { id: 'nonexistentid' }
            }

            const response = await supertest(app).post('/graphql').send(query)

            expect(response.status).toBe(200)
            expect(response.body.data.getUser).toBeNull()
        })
    })
})
