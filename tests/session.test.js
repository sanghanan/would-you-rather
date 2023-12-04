const request = require('supertest');
const app = require('../index'); // Adjust the path to your Express app

describe('Session Management', () => {
    it('Session should expire after set time', async () => {
        // Log in to the application
        const loginResponse = await request(app)
            .post('/auth/login')
            .send({ username: 'testUser', password: 'testPassword' })
            .expect(302); // Expect a redirection response on successful login

        // Extract the session cookie from the login response
        const cookie = loginResponse.headers['set-cookie'][0];

        // Wait for the session to expire
        await new Promise(resolve => setTimeout(resolve, 70000));

        // Attempt to access the poll toggle route
        await request(app)
            .post('/vote/toggle') // Adjusted to the correct path
            .set('Cookie', cookie)
            .expect(403); // Expecting 403 Forbidden for unauthorized access
    }, 80000);  // Increase the timeout for this test to 80 seconds

    it('Session ID should change after login', async () => {
        // Initiate a session and get the session ID
        const initialResponse = await request(app)
            .get('/') // Replace with a route that initiates a session, like the home page
            .expect(200);

        const initialCookie = initialResponse.headers['set-cookie'][0];

        // Perform login
        const loginResponse = await request(app)
            .post('/auth/login')
            .send({ username: 'testUser', password: 'testPassword' })
            .expect(302); // Expect a redirection response on successful login

        const newCookie = loginResponse.headers['set-cookie'][0];

        // Check if the session IDs are different
        expect(initialCookie).not.toBe(newCookie);
    });
});
