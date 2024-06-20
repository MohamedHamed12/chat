const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
// const { validateConversation } = require('../middleware/validateConversation');
const validateConversation = require('../validators/conversationValidator');
// const validateConversation = require('../validators/conversationValidator');

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: API endpoints for managing conversations.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       required:
 *         - name
 *         - participants
 *       properties:
 *         _id:
 *           type: string
 *           description: The conversation ID
 *         name:
 *           type: string
 *           description: The name of the conversation
 *         participants:
 *           type: array
 *           items:
 *             type: string
 *             description: The user ID of the participant
 *       example:
 *         _id: 60d0fe4f5311236168a109cb
 *         name: Project Discussion
 *         participants:
 *           - 60d0fe4f5311236168a109ca
 *           - 60d0fe4f5311236168a109cc
 */

/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conversation'
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       400:
 *         description: Bad request
 */
router.post('/', validateConversation, conversationController.createConversation);

/**
 * @swagger
 * /conversations:
 *   get:
 *     summary: Get all conversations
 *     tags: [Conversations]
 *     responses:
 *       200:
 *         description: List of all conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 *       400:
 *         description: Bad request
 */
router.get('/', conversationController.getConversations);

/**
 * @swagger
 * /conversations/{id}:
 *   get:
 *     summary: Get a conversation by ID
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The conversation ID
 *     responses:
 *       200:
 *         description: Conversation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       404:
 *         description: Conversation not found
 *       400:
 *         description: Bad request
 */
router.get('/:id', conversationController.getConversationById);

/**
 * @swagger
 * /conversations/{id}:
 *   put:
 *     summary: Update a conversation by ID
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The conversation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conversation'
 *     responses:
 *       200:
 *         description: Conversation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       404:
 *         description: Conversation not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', validateConversation, conversationController.updateConversation);

/**
 * @swagger
 * /conversations/{id}:
 *   delete:
 *     summary: Delete a conversation by ID
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The conversation ID
 *     responses:
 *       200:
 *         description: Conversation deleted successfully
 *       404:
 *         description: Conversation not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id', conversationController.deleteConversation);

module.exports = router;
