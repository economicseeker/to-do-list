const express = require('express');
const { create, read, removeTodo } = require('../controller/index');

const router = express.Router();

// POST route to create a new todo
router.post('/todo/create', create);

// GET route to fetch all todos
router.get('/todos', read);

// DELETE route to remove a todo by id
router.delete('/todo/:id', removeTodo);

module.exports = router; 