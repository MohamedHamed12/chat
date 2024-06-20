const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const {app,_} = require('../app'); // Assuming your app is structured in a file named 'app.js'
const Conversation = require('../models/Conversation');
const User=require('../models/User')
const userData = { username: 'testuser', email: 'testuser@example.com' };
const newUser = new User(userData);
const savedUser =  newUser.save();
// Test data
const testData = {
    name: 'Test Conversation',
    participants: [] // Replace with actual user IDs
};


let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();

    await mongoose.connect(mongoUri);

    const userData = { username: 'testuser', email: 'testuser@example.com' };
    const newUser = new User(userData);
    let savedUser = await newUser.save(); // Wait for user to be saved

    // Update test data with saved user IDs
    testData.participants = [savedUser._id, savedUser._id];
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Conversation.deleteMany();
});

describe('Conversation API', () => {


    it('should create a new conversation', async () => {
        const response = await request(app)
            .post('/conversations')
            .send(testData)
            .expect(201);
        // console.log(response.body);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(testData.name);
        // expect(response.body.participants).toEqual(testData.participants);
    });
    it('should get all conversations', async () => {
        await Conversation.create(testData);

        const response = await request(app)
            .get('/conversations')
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe(testData.name);
        // expect(response.body[0].participants).toEqual(testData.participants);
    });


    // Add more tests for other CRUD operations similarly
});
