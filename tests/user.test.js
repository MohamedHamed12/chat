
const request = require('supertest');
// const app = require('../app'); // Assuming your app is structured in a file named 'app.js'
const {app,server} = require('../app'); // Adjust the path based on your file structure

const mongoose = require('mongoose');
const User = require('../models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config();
const dburl = process.env.MONGODB_URI;
// Test data
const testData = {
    username: 'testuser',
    email: 'testuser@example.com'
};

describe('User API', () => {
    beforeAll(async () => {
        // Connect to a test database
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        // Disconnect mongoose
        mongoose.connection.close()

        await mongoose.disconnect();
    });

    beforeEach(async () => {
        // Clear the database before each test
        await User.deleteMany();
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send(testData)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.username).toBe(testData.username);
        expect(response.body.email).toBe(testData.email);
    });

    it('should get all users', async () => {
        await User.create(testData);

        const response = await request(app)
            .get('/users')
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].username).toBe(testData.username);
        expect(response.body[0].email).toBe(testData.email);
    });

    it('should get a user by ID', async () => {
        const newUser = await User.create(testData);

        const response = await request(app)
            .get(`/users/${newUser._id}`)
            .expect(200);

        expect(response.body.username).toBe(testData.username);
        expect(response.body.email).toBe(testData.email);
    });

    it('should update a user', async () => {
        const newUser = await User.create(testData);
        const updatedData = { username: 'updateduser', email: 'updateduser@example.com' };

        const response = await request(app)
            .put(`/users/${newUser._id}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.username).toBe(updatedData.username);
        expect(response.body.email).toBe(updatedData.email);
    });

    it('should delete a user', async () => {
        const newUser = await User.create(testData);

        await request(app)
            .delete(`/users/${newUser._id}`)
            .expect(204);

        const deletedUser = await User.findById(newUser._id);
        expect(deletedUser).toBeNull();
    });
});
