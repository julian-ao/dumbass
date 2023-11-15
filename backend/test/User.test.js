const supertest = require('supertest');
const {app, server} = require("../server/index.js"); 
const { closeDatabaseConnection } = require("../server/config/db.js")
const User = require('../server/models/User');

jest.mock('../server/models/User', () => ({
    findOne: jest.fn(),
    findById: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();

    User.findById.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
        favorites: [
            {
                type: 'song',
                targetId: 1
            }
        ]
    });

});

afterAll(async () => {
    await closeDatabaseConnection();
    server.close();
});

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
                variables: { id: 1 },
            };

            const response = await supertest(app)
                .post('/graphql')
                .send(query);

            expect(response.status).toBe(200);
            expect(response.body.data.getUser).toBeDefined();
            expect(response.body.data.getUser.username).toBe('testuser');
            expect(response.body.data.getUser.favorites).toBeInstanceOf(Array);
            expect(response.body.data.getUser.favorites).toHaveLength(1);
            expect(response.body.data.getUser.favorites[0].type).toBe('song');
            expect(response.body.data.getUser.favorites[0].targetId).toBe(1);
        });
    })
})