// const request = require('supertest');
// const {app,server} = require('../app'); // Adjust the path based on your file structure
// // const {server,app} = require('../app'); // Adjust the path based on your file structure
// const User =require('../models/User')
// const mongoose = require('mongoose');
// const Conversation = require('../models/Conversation');
// require('dotenv').config();
// const dburl = process.env.MONGODB_URI;
// beforeAll(async () => {
//   // Connect to MongoDB using a test-specific URI or an in-memory database like MongoMemoryServer
//   await mongoose.connect(dburl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterEach(async () => {
//   // Clean up by removing all data from collections after each test
//   // await Conversation.deleteMany({});
// });

// afterAll(async () => {
//   // Disconnect MongoDB
//   await mongoose.connection.close();
// });

// describe('Conversations API', () => {
//   let conversationId;

//   it('should create a new conversation', async () => {
//     const userData = { username: 'testuser', email: 'testuser@example.com' };
//     const newUser = new User(userData);
//     const savedUser = await newUser.save();
//     let res = await request(app)
//       .post('/conversations')
//       .send({ name:"conv1",participants: [savedUser._id,savedUser._id] })
//       .expect(201);
//       // console.log(res.body)

//       conversationId = res.body._id;
//         console.log(conversationId);
//        res = await request(app)
//         .post(`/messages`)
//         .send({ conversation:conversationId,sender: savedUser._id ,content: 'Hello, World!' })
//         .expect(201);
  
    
//     // const conversation = await Conversation.findById(conversationId);
//     // expect(conversation.messages.length).toBe(1);

//   });
// });


const request = require('supertest');
const {app,_} = require('../app'); // Assuming your app is structured in a file named 'app.js'
const mongoose = require('mongoose');
const Message = require('../models/Message');
const User = require('../models/User');
const Conversation = require('../models/Conversation');

const { MongoMemoryServer } = require('mongodb-memory-server');

// Test data
const testData = {
    conversation: 'conversation_id', // Replace with actual conversation ID
    sender: 'user_id', // Replace with actual user ID
    content: 'Test message content'
};

describe('Message API', () => {
    beforeAll(async () => {
        // Connect to a test database
        // await mongoose.connect('mongodb://localhost:27017/testdb');

        mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();

    await mongoose.connect(mongoUri);

           const userData = { username: 'testuser', email: 'testuser@example.com' };
    const newUser = new User(userData);
    let savedUser = await newUser.save();
    testData.sender=savedUser._id.toString();

    const newCon=new Conversation({
      name:'conv',
      participants:[savedUser._id,savedUser._id]
    })
    let savedCon=await newCon.save();
    testData.conversation=savedCon._id.toString();

    });

    afterAll(async () => {
        // Disconnect mongoose
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        // Clear the database before each test
        await Message.deleteMany();
    });

    it('should create a new message', async () => {
        const response = await request(app)
            .post('/messages')
            .send(testData)
            .expect(201);
       
        expect(response.body).toHaveProperty('_id');
        // expect(response.body.conversation).toBe(testData.conversation);
        expect(response.body.sender).toBe(testData.sender);
        expect(response.body.content).toBe(testData.content);
    });

    it('should get all messages', async () => {
     
        const msg= new Message(testData);
        const savedMsg=msg.save();
        // console.log(Message)

        const response = await request(app)
            .get('/messages')
            .expect(200);

        expect(response.body.length).toBe(1);
        // expect(response.body[0].conversation).toBe(testData.conversation);
        // expect(response.body[0].sender).toBe(testData.sender);
        expect(response.body[0].content).toBe(testData.content);
    });

    // Add tests for getting by ID, updating, and deleting messages similarly
});
