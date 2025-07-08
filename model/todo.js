const pool = require('./database');

// Create a new todo item
const create = (description) =>
  pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
    description,
  ]);

// Get all todo items
const get = () => pool.query('SELECT * FROM todo');

// Remove a todo item by id
const remove = (id) =>
  pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

module.exports = {
  create,
  get,
  remove,
};
