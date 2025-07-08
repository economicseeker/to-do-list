const formidable = require('formidable');
const { create, get, remove } = require('../model/todo');

// Middleware to create a new todo item
exports.create = (req, res) => {
  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields) => {
    if (err) {
      return res.status(400).json({ error: 'Form parsing error' });
    }
    const { description } = fields;
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    try {
      const result = await create(description);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  });
};

// Middleware to get all todo items
exports.read = async (req, res) => {
  try {
    const result = await get();
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

// Middleware to remove a todo item by id
exports.removeTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await remove(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
}; 