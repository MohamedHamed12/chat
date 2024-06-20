const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./db');


const conversationRoutes = require('./routes/conversations');
const messageRoutes = require('./routes/messages');
const usersRoutes =require('./routes/user');


const app = express();
const server = http.createServer(app);
// const io = socketIo(server);


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Middleware
app.use(express.json());
// app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Chat server is running');
});

app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);
app.use('/users', usersRoutes);


module.exports = { app, server };
