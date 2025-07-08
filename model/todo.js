const pool = require('./database');

// Create a new todo item
const create = async (description) => {
  try {
    return await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
      description,
    ]);
  } catch (err) {
    console.error('DB error in create:', err);
    throw err;
  }
};

// Get all todo items
const get = async () => {
  try {
    return await pool.query('SELECT * FROM todo');
  } catch (err) {
    console.error('DB error in get:', err);
    throw err;
  }
};

// Remove a todo item by id
const remove = async (id) => {
  try {
    return await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
  } catch (err) {
    console.error('DB error in remove:', err);
    throw err;
  }
};

module.exports = {
  create,
  get,
  remove,
};
