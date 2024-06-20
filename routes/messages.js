




const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { validateMessage } = require('../validators/messageValidation');

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for managing messages.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - conversation
 *         - sender
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The message ID
 *         conversation:
 *           type: string
 *           description: The conversation ID
 *         sender:
 *           type: string
 *           description: The user ID of the sender
 *         content:
 *           type: string
 *           description: The content of the message
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the message
 *       example:
 *         _id: 60d0fe4f5311236168a109cd
 *         conversation: 60d0fe4f5311236168a109cb
 *         sender: 60d0fe4f5311236168a109ca
 *         content: "Hello, how are you?"
 *         timestamp: "2023-06-20T12:00:00Z"
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 */
router.post('/', validateMessage, messageController.createMessage);

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: List of all messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 */
router.get('/', messageController.getAllMessages);

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message ID
 *     responses:
 *       200:
 *         description: Message found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 *       400:
 *         description: Bad request
 */
router.get('/:id', messageController.getMessageById);

/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Update a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', validateMessage, messageController.updateMessage);

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
