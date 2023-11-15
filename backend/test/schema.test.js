const supertest = require('supertest');
const {app, server} = require("../server/index.js"); 
const { closeDatabaseConnection } = require("../server/config/db.js")
const Artist = require('../server/models/Artist');
const Review = require('../server/models/Review');
const Song = require('../server/models/Song');
const User = require('../server/models/User');

jest.mock('../server/models/Artist', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    countDocuments: jest.fn(),
}));

jest.mock('../server//models/Review', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('../server/models/Song', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    countDocuments: jest.fn(),
}));

jest.mock('../server/models/User', () => ({
    findOne: jest.fn(),
    findById: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();

    Artist.find = jest.fn().mockReturnThis();
    Artist.sort = jest.fn().mockReturnThis();
    Artist.skip = jest.fn().mockReturnThis();
    Artist.limit = jest.fn().mockImplementation(() => Promise.resolve([
        {
            alternate_names: ['Alternate Name 1', 'Alternate Name 2'],
            description: ['Description 1', 'Description 2'],
            id: 1,
            image_url: 'http://example.com/image1.jpg',
            name: 'Artist 1',
            average_rating: 4.5,
            number_of_ratings: 100
        },
        {
            alternate_names: ['Alternate Name 3', 'Alternate Name 4'],
            description: ['Description 3', 'Description 4'],
            id: 2,
            image_url: 'http://example.com/image2.jpg',
            name: 'Artist 2',
            average_rating: 4.0,
            number_of_ratings: 80
        }
    ]));
    Artist.findOne.mockResolvedValue({
        alternate_names: ['Alternate Name 1', 'Alternate Name 2'],
        description: ['Description 1', 'Description 2'],
        id: 1,
        image_url: 'http://example.com/image1.jpg',
        name: 'Artist 1',
        average_rating: 4.5,
        number_of_ratings: 100
    });
    Artist.countDocuments = jest.fn().mockImplementation(query => {
        if (query && query.name) {
            return Promise.resolve(2);
        } else {
            return Promise.resolve(0); 
        }
    });


    Song.find = jest.fn().mockReturnThis();
    Song.sort = jest.fn().mockReturnThis();
    Song.skip = jest.fn().mockReturnThis();
    Song.limit = jest.fn().mockImplementation(() => Promise.resolve([
        {
            artist_names: "Artist 1",
            description: ["Description of the song 1", "More about the song"],
            header_image_url: "http://example.com/song1-image.jpg",
            id: 1,
            release_date: "2023-01-01",
            title: "Song Title 1",
            primary_artist_id: 101,
            average_rating: 4.5,
            number_of_ratings: 200,
            lyrics: "Lyrics of song 1"
        },
        {
            artist_names: "Artist 2",
            description: ["Description of the song 2", "More about the song"],
            header_image_url: "http://example.com/song2-image.jpg",
            id: 2,
            release_date: "2023-01-02",
            title: "Song Title 2",
            primary_artist_id: 102,
            average_rating: 4.0,
            number_of_ratings: 150,
            lyrics: "Lyrics of song 2"
        }
    ]));
    Song.findOne.mockResolvedValue({
        artist_names: "Artist 1",
        description: ["Description of the song 1", "More about the song"],
        header_image_url: "http://example.com/song1-image.jpg",
        id: 1,
        release_date: "2023-01-01",
        title: "Song Title 1",
        primary_artist_id: 101,
        average_rating: 4.5,
        number_of_ratings: 200,
        lyrics: "Lyrics of song 1"
    });
    Song.countDocuments = jest.fn().mockImplementation(query => {
        if (query && query.title) {
            return Promise.resolve(2);
        } else {
            return Promise.resolve(0); 
        }
    });

    User.findOne.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
        favorites: [
            {
                type: 'song',
                targetId: 1
            },
            {
                type: 'artist',
                targetId: 1
            }
        ]
    });
    User.findById.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
        favorites: [
            {
                type: 'song',
                targetId: 1
            },
            {
                type: 'artist',
                targetId: 1
            }
        ]
    });

    Review.find = jest.fn().mockImplementation(query => {
        // Define mock review data
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
                targetType: 'artist',
                targetId: 1
            }
        ];
    
        // Handle specific query conditions
        if (query && query.targetType && query.targetId) {
            // Filter based on provided targetType and targetId
            return Promise.resolve(mockReviews.filter(review => 
                review.targetType === query.targetType && review.targetId === query.targetId));
        }
    
        // Return all mock reviews if no specific query condition
        return Promise.resolve(mockReviews);
    });
    
    Review.findOne.mockResolvedValue({
        username: 'testuser',
        content: 'Comment 1',
        rating: 4.5,
        targetType: 'song',
        targetId: 1
    });
});


afterAll(async () => {
    await closeDatabaseConnection();
    server.close();
});


describe('GraphQL Schema', () => {
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
                variables: { id: 1 },
            };

            const response = await supertest(app)
                .post('/graphql')
                .send(query);

            expect(response.status).toBe(200);
            expect(response.body.data.getUser).toBeDefined();
            expect(response.body.data.getUser.username).toBe('testuser');
            expect(response.body.data.getUser.favorites).toBeInstanceOf(Array);
            expect(response.body.data.getUser.favorites).toHaveLength(2);
            expect(response.body.data.getUser.favorites[0].type).toBe('song');
            expect(response.body.data.getUser.favorites[0].targetId).toBe(1);
            expect(response.body.data.getUser.favorites[1].type).toBe('artist');
            expect(response.body.data.getUser.favorites[1].targetId).toBe(1);
        });

        test('getTopArtists', async () => {
            const query = {
                query: `
                    query {
                        getTopArtists(limit: 5) {
                            name
                            average_rating
                        }
                    }
                `
            };
        
            const response = await supertest(app).post('/graphql').send(query);
        
            expect(response.status).toBe(200);
            expect(response.body.data.getTopArtists).toBeInstanceOf(Array);
            expect(response.body.data.getTopArtists).toHaveLength(2);
            expect(response.body.data.getTopArtists[0].name).toBe('Artist 1');
            expect(response.body.data.getTopArtists[0].average_rating).toBe(4.5);
        });

        test('getTopSongs', async () => {
            const query = {
                query: `
                    query {
                        getTopSongs(limit: 5) {
                            title
                            average_rating
                        }
                    }
                `
            };

            const response = await supertest(app).post('/graphql').send(query);

            expect(response.status).toBe(200);
            expect(response.body.data.getTopSongs).toBeInstanceOf(Array);
            expect(response.body.data.getTopSongs).toHaveLength(2);
            expect(response.body.data.getTopSongs[0].title).toBe('Song Title 1');
            expect(response.body.data.getTopSongs[0].average_rating).toBe(4.5);
            expect(response.body.data.getTopSongs[1].title).toBe('Song Title 2');
            expect(response.body.data.getTopSongs[1].average_rating).toBe(4.0);
        });

        test('getArtistById', async () => {
            const query = {
                query: `
                    query GetArtistById($id: ID!) {
                        getArtistById(id: $id) {
                            name
                            description
                        }
                    }
                `,
                variables: { id: 1 },
            };

            const response = await supertest(app).post('/graphql').send(query);

            expect(response.status).toBe(200);
            expect(response.body.data.getArtistById).toBeDefined();
            expect(response.body.data.getArtistById.name).toBe('Artist 1');
            expect(response.body.data.getArtistById.description).toBeInstanceOf(Array);
            expect(response.body.data.getArtistById.description).toHaveLength(2);
            expect(response.body.data.getArtistById.description[0]).toBe('Description 1');
            expect(response.body.data.getArtistById.description[1]).toBe('Description 2');
        });
        
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
                variables: { id: 1 },
            };
        
            const response = await supertest(app).post('/graphql').send(query);
        
            expect(response.status).toBe(200);
            expect(response.body.data.getSongById).toBeDefined();
            expect(response.body.data.getSongById.title).toBe('Song Title 1');
            expect(response.body.data.getSongById.lyrics).toBe('Lyrics of song 1');
        });

        // test('getArtistsByIds', async () => {
        //     const query = {
        //         query: `
        //             query GetArtistsByIds($ids: [Int]!) {
        //                 getArtistsByIds(ids: $ids) {
        //                     name
        //                     description
        //                 }
        //             }
        //         `,
        //         variables: { ids: [1, 2] },
        //     };

        //     const response = await supertest(app).post('/graphql').send(query);
            
        //     console.log(response.body.data)
        //     expect(response.status).toBe(200);
        //     expect(response.body.data.getArtistsById).toBeInstanceOf(Array);
        //     expect(response.body.data.getArtistsById).toHaveLength(2);
        //     expect(response.body.data.getArtistsById[0].name).toBe('Artist 1');
        //     expect(response.body.data.getArtistsById[0].description).toBeInstanceOf(Array);
        //     expect(response.body.data.getArtistsById[0].description).toHaveLength(2);
        //     expect(response.body.data.getArtistsById[0].description[0]).toBe('Description 1');
        //     expect(response.body.data.getArtistsById[0].description[1]).toBe('Description 2');
        //     expect(response.body.data.getArtistsById[1].name).toBe('Artist 2');
        //     expect(response.body.data.getArtistsById[1].description).toBeInstanceOf(Array);
        //     expect(response.body.data.getArtistsById[1].description).toHaveLength(2);
        //     expect(response.body.data.getArtistsById[1].description[0]).toBe('Description 3');
        //     expect(response.body.data.getArtistsById[1].description[1]).toBe('Description 4');
        // });

        // test('getSongsByIds', async () => {
        // });

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
                variables: { targetType: 'song', targetId: 1 },
            };

            const response = await supertest(app).post('/graphql').send(query);

            expect(response.status).toBe(200);
            expect(response.body.data.getReviewsByTarget).toBeInstanceOf(Array);
            expect(response.body.data.getReviewsByTarget).toHaveLength(1);
            expect(response.body.data.getReviewsByTarget[0].content).toBe('Comment 1');
            expect(response.body.data.getReviewsByTarget[0].rating).toBe(4.5);
        });

        test('searchSearchbar', async () => {
            const query = {
                query: `
                    query SearchSearchbar($searchString: String!, $searchType: String!, $limit: Int) {
                        searchSearchbar(searchString: $searchString, searchType: $searchType, limit: $limit) {
                            ... on Artist {
                                name
                                average_rating
                            }
                        }
                    }
                `,
                variables: { searchString: "Artist", searchType: "artist", limit: 2 },
            };
    
            const response = await supertest(app).post('/graphql').send(query);
    
            expect(response.status).toBe(200);
            expect(response.body.data.searchSearchbar).toBeInstanceOf(Array);
            expect(response.body.data.searchSearchbar.length).toBeLessThanOrEqual(2);
        });

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
                variables: { title: "Song Title", sort: "rating", limit: 2, page: 1 },
            };
    
            const response = await supertest(app).post('/graphql').send(query);
    
            expect(response.status).toBe(200);
            expect(response.body.data.getSongsOnTitle).toBeInstanceOf(Array);
            let previousRating = Infinity;
            response.body.data.getSongsOnTitle.forEach(song => {
                expect(song.title).toMatch(/Song Title /i);
                expect(song.average_rating).toBeLessThanOrEqual(previousRating);
                previousRating = song.average_rating;
            });
        });

        test('getArtistsOnName', async () => {
            const query = {
                query: `
                    query GetArtistsOnName($name: String!, $sort: String!, $limit: Int, $page: Int) {
                        getArtistsOnName(name: $name, sort: $sort, limit: $limit, page: $page) {
                            name
                            average_rating
                        }
                    }
                `,
                variables: { name: "Artist", sort: "rating", limit: 2, page: 1 },
            };
    
            const response = await supertest(app).post('/graphql').send(query);
    
            expect(response.status).toBe(200);
            expect(response.body.data.getArtistsOnName).toBeInstanceOf(Array);
            let previousRating = Infinity;
            response.body.data.getArtistsOnName.forEach(artist => {
                expect(artist.name).toMatch(/Artist /i);
                expect(artist.average_rating).toBeLessThanOrEqual(previousRating);
                previousRating = artist.average_rating;
            });
        });

        test('countSongs', async () => {
            const query = {
                query: `
                    query CountSongs($title: String!) {
                        countSongs(title: $title)
                    }
                `,
                variables: { title: "Song" }
            };

            const response = await supertest(app).post('/graphql').send(query);

            expect(response.status).toBe(200);
            expect(response.body.data.countSongs).toBeDefined();
            expect(typeof response.body.data.countSongs).toBe('number');
            expect(response.body.data.countSongs).toBe(2);
        });

        test('countArtists', async () => {
            const query = {
                query: `
                    query CountArtists($name: String!) {
                        countArtists(name: $name)
                    }
                `,
                variables: { name: "Artist" }
            };
    
            const response = await supertest(app).post('/graphql').send(query);
            
            expect(response.status).toBe(200);
            expect(response.body.data.countArtists).toBeDefined();
            expect(typeof response.body.data.countArtists).toBe('number');
            expect(response.body.data.countArtists).toBe(2);
        });

        test('checkIfFavourite', async () => {
            const queryTrue = {
                query: `
                    query CheckIfFavorite($username: String!, $type: String!, $targetId: Int!) {
                        checkIfFavorite(username: $username, type: $type, targetId: $targetId)
                    }
                `,
                variables: { username: "testuser", type: "song", targetId: 1 },
            };

            const queryFalse = {
                query: `
                    query CheckIfFavorite($username: String!, $type: String!, $targetId: Int!) {
                        checkIfFavorite(username: $username, type: $type, targetId: $targetId)
                    }
                `,
                variables: { username: "testuser", type: "song", targetId: 3 },
            };
    
            const responseTrue = await supertest(app).post('/graphql').send(queryTrue);
    
            expect(responseTrue.status).toBe(200);
            expect(responseTrue.body.data.checkIfFavorite).toBe(true);

            const responseFalse = await supertest(app).post('/graphql').send(queryFalse);

            expect(responseFalse.status).toBe(200);
            expect(responseFalse.body.data.checkIfFavorite).toBe(false);
        });

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
                variables: { username: "testuser" },
            };
    
            const response = await supertest(app).post('/graphql').send(query);
    
            expect(response.status).toBe(200);
            expect(response.body.data.getFavorites).toBeInstanceOf(Array);
            expect(response.body.data.getFavorites).toHaveLength(2);
            expect(response.body.data.getFavorites[0].type).toBeDefined();
            expect(response.body.data.getFavorites[0].targetId).toBeDefined();
        });
        
    });

});
