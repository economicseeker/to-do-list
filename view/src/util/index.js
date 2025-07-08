// Utility functions for API calls to the backend

export const createTodo = async (todo) => {
  const formData = new FormData();
  formData.append('description', todo.description);
  const response = await fetch('/todo/create', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

export const getTodos = async () => {
  const response = await fetch('/todos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const removeTodo = async (id) => {
  const response = await fetch(`/todo/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return response;
}; 