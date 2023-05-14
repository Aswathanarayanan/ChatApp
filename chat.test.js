const request = require('supertest');
const { authUser} = require('../ChatApp/backend/controller/userController');

//jest --testTimeout = 10000

describe('POST /api/user/login', () => {
    test('responds with JSON array of users', async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const response = await request(authUser).post('/api/user/login', { email: "aswathas@iiitb.org", password: "123456" }, config);
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.email).toEqual("aswathas@iiitb.org");
        expect(response.body.name).toEqual("Aswathas");

    },8000);
});
