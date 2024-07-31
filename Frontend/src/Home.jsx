import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsSun, BsMoon, BsFillPencilFill } from 'react-icons/bs';
import './App.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      setError('Failed to fetch todos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleEdit = useCallback(async (id, currentDoneState) => {
    setError(null);
    try {
      const response = await axios.put(`/api/todos/${id}`, { done: !currentDoneState });
      setTodos(prevTodos => prevTodos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    setError(null);
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
    }
  }, []);

  const handleAdd = useCallback(async (task) => {
    setError(null);
    try {
      const response = await axios.post('/api/todos', { task });
      setTodos(prevTodos => [response.data, ...prevTodos]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
    }
  }, []);

  const handleUpdate = useCallback(async (id, updatedTask) => {
    setError(null);
    try {
      const response = await axios.put(`/api/todos/${id}`, { task: updatedTask });
      setTodos(prevTodos => prevTodos.map(todo =>
        todo._id === id ? response.data : todo
      ));
      setEditingTodo(null);
    } catch (err) {
      setError('Failed to update todo. Please try again.');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [todos]);

  const handleEditKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUpdate(editingTodo._id, editingTodo.task);
    }
  };

  return (
    <div className={`home ${theme}`}>
      <div className='theme-toggle' onClick={toggleTheme}>
        {theme === 'light' ? <BsMoon aria-label="Switch to dark mode" /> : <BsSun aria-label="Switch to light mode" />}
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : sortedTodos.length === 0 ? (
        <div className="empty-todo-list">
          <h2 className="heading">TODO LIST</h2>
          <Create onAdd={handleAdd} theme={theme} />
          <h3>No Record</h3>
        </div>
      ) : (
        <>
          <h2 className="heading">TODO LIST</h2>
          <Create onAdd={handleAdd} theme={theme} />
          {sortedTodos.map(todo => (
            <div className={`task ${theme}`} key={todo._id}>
              <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
                {todo.done ? 
                  <BsFillCheckCircleFill className={`icon ${theme}`} aria-label="Mark as undone" />
                : 
                  <BsCircleFill className={`icon ${theme}`} aria-label="Mark as done" />
                }
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span className='edit'> 
                  <BsFillPencilFill className={`icon ${theme}`} onClick={() => setEditingTodo(todo)} aria-label="Edit todo" />
                </span>
                <BsFillTrashFill className={`icon ${theme}`} onClick={() => handleDelete(todo._id)} aria-label="Delete todo" />
              </div>
            </div>
          ))}
        </>
      )}
      {editingTodo && (
        <div className='edit_form'>
          <input
            type='text'
            value={editingTodo.task}
            onChange={(e) => setEditingTodo({ ...editingTodo, task: e.target.value })}
            onKeyPress={handleEditKeyPress}
            aria-label="Edit todo task"
          />
          <button className="update-btn" onClick={() => handleUpdate(editingTodo._id, editingTodo.task)}>Update</button>
          <button className='cancel-btn' onClick={() => setEditingTodo(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
