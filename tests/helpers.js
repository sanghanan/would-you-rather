const request = require('supertest');
const app = require('../index');

async function loginUser(username, password) {
    return await request(app)
        .post('/auth/login')
        .send({ username, password });
}

module.exports = { loginUser };
