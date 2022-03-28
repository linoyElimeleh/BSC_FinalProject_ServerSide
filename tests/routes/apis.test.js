const request = require('supertest');
const app = require('../../app');
const userDbHandler = require('../../models/actions/users');

const email = "only-for-tests-user@email.com";
const displayName = "only for tests display name"
const password = "Password1";

const testUser = {
    display_name: displayName,
    email: email,
    birth_date: "2016-01-01",
    password: password
}

const authResponseKeys = ['accessToken', 'refreshToken'];

jest.setTimeout(10000);

beforeAll((done) => {
    userDbHandler.deleteUserByEmail(email).then(() => {
        done()
        // userDbHandler.createUser(testUser));
    });
})

afterAll((done) => {
    userDbHandler.deleteUserByEmail(email).then(done);
})

describe("testing users router", () => {
    let tokens;
    test("POST /api/users/register - success", async () => {
        const response = await request(app).post('/api/users/register').send(testUser);
        expect(response.statusCode).toEqual(200);
        tokens = response.body;
        expect(Object.keys(tokens)).toEqual(authResponseKeys);
    });

    test("POST /api/users/register - user already exists", async () => {
        const response = await request(app).post('/api/users/register').send(testUser);
        expect(response.statusCode).toEqual(400);
    });
})

describe("testing auth router", () => {
    let tokens;
    let newTokens;
    test("POST /api/auth/login", async () => {
        const response = await request(app).post('/api/auth/login').send({
            email: email,
            password: password
        });
        expect(response.statusCode).toEqual(200);
        tokens = response.body;
        expect(Object.keys(tokens)).toEqual(authResponseKeys);
    });

    test("POST /api/auth/refresh_token - Success", async () => {
        const goodResponse = await request(app).post('/api/auth/refresh_token').send({
            refresh_token: tokens.refreshToken
        });
        expect(goodResponse.statusCode).toEqual(200);
        newTokens = goodResponse.body;
        expect(Object.keys(tokens)).toEqual(authResponseKeys);
    });

    test("POST /api/auth/refresh_token - Unauthorized Error", () => {
        request(app).post('/api/auth/refresh_token').send({
            refresh_token: tokens.refreshToken
        }).then((res) => {
            expect(res.statusCode).toEqual(401);
        });
    });

    test("DELETE /api/auth/refresh_token", () => {
        request(app).delete('/api/auth/refresh_token').send({
            refresh_token: newTokens.refreshToken
        }).then((res) => {
            expect(res.statusCode).toEqual(200);
        });
    })
})

describe("healthCheck GET /api/beep", () => {
    test("expecting for boop", async () => {
        const expectedResponse = {
            "beep": "boop"
        }
        const response = await request(app).get('/api/beep');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expectedResponse);
    })
})