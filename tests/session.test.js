const request = require('supertest');
const app = require('../index');

describe('Session Management', () => {
    it('Session should expire after set time', async () => {
        // Log in to the application
        const loginResponse = await request(app)
            .post('/auth/login')
            .send({ username: 'testUser', password: 'testPassword' })
            .expect(302);

        const cookie = loginResponse.headers['set-cookie'][0];

        await new Promise(resolve => setTimeout(resolve, 70000));

        await request(app)
            .post('/vote/toggle')
            .set('Cookie', cookie)
            .expect(403);
    }, 80000);

    it('Session ID should change after login', async () => {
        const initialResponse = await request(app)
            .get('/')
            .expect(200);

        const initialCookie = initialResponse.headers['set-cookie'][0];

        const loginResponse = await request(app)
            .post('/auth/login')
            .send({ username: 'testUser', password: 'testPassword' })
            .expect(302);

        const newCookie = loginResponse.headers['set-cookie'][0];

        expect(initialCookie).not.toBe(newCookie);
    });

    it('Session cookies should be secure and HttpOnly', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
    
        const cookie = response.headers['set-cookie'][0];
    
        expect(cookie).toBeDefined();
        const cookieFlags = cookie.toLowerCase().split(';').map(flag => flag.trim());
        expect(cookieFlags).toContain('secure');
        expect(cookieFlags).toContain('httponly');
    });
    
});
