import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util';

const App = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState();
  const [error, setError] = useState();

  // Fetch all todos from the backend
  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTodoList(todos);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
    }
  };

  // Handle form submission to add a new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.description.trim()) {
      setError('Description cannot be empty');
      return;
    }
    try {
      await createTodo(todo);
      setTodo({ description: '' });
      setError(null);
      fetchTodos();
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  // Handle deleting a todo by id
  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      setError(null);
      fetchTodos();
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  useEffect(() => {
    // Initialize todoList
    fetchTodos();
  }, []);
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) =>
            setTodo({ ...todo, description: event.target.value })
          }
        ></input>
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList?.map((todoItem) => (
          <li
            key={todoItem.todo_id}
            onClick={() => {
              handleDelete(todoItem.todo_id);
            }}
          >
            {todoItem.description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
