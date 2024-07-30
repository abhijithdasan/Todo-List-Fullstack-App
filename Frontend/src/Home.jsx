import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsSun, BsMoon, BsFillPencilFill } from 'react-icons/bs';
import './App.css';

axios.defaults.baseURL = 'http://localhost:3001';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        setError('Failed to fetch todos. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleEdit = async (id, currentDoneState) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, { done: !currentDoneState });
      setTodos(prevTodos => prevTodos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
    }
  };

  const handleAdd = async (task) => {
    try {
      const response = await axios.post('/api/todos', { task });
      setTodos(prevTodos => [...prevTodos, response.data]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, { task: updatedTask });
      setTodos(prevTodos => prevTodos.map(todo =>
        todo._id === id ? response.data : todo
      ));
      setEditingTodo(null); // Clear editing state
    } catch (err) {
      setError('Failed to update todo. Please try again.');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`home ${theme}`}>
      <div className='theme-toggle' onClick={toggleTheme}>
        {theme === 'light' ? <BsMoon /> : <BsSun />}
      </div>
      <h2>TODO LIST</h2>
      <Create onAdd={handleAdd} theme={theme} />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : todos.length === 0 ? (
        <div><h3>No Record</h3></div>
      ) : (
        todos.map(todo => (
          <div className={`task ${theme}`} key={todo._id}>
            <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
              {todo.done ? 
                <BsFillCheckCircleFill className={`icon ${theme}`} />
              : 
                <BsCircleFill className={`icon ${theme}`} />
              }
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span className='edit'> 
              <BsFillPencilFill className= {`icon ${theme}`} onClick={() => setEditingTodo(todo)} /></span>
              <BsFillTrashFill className={`icon ${theme}`} onClick={() => handleDelete(todo._id)} />
            </div>
          </div>
        ))
      )}
      {editingTodo && (
        <div className='edit_form'>
          <input
            type='text'
            value={editingTodo.task}
            onChange={(e) => setEditingTodo({ ...editingTodo, task: e.target.value })}
          />
          <button onClick={() => handleUpdate(editingTodo._id, editingTodo.task)}>Update</button>
          <button onClick={() => setEditingTodo(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
