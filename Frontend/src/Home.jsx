import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsSun, BsMoon } from 'react-icons/bs';
import './App.css';

// Setting the base URL for axios requests
axios.defaults.baseURL = 'http://localhost:3001';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
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
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleAdd = async (task) => {
    try {
      const response = await axios.post('/api/todos', { task });
      setTodos(prevTodos => [...prevTodos, response.data]);
    } catch (err) {
      console.error('Error adding todo:', err);
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
      <Create setTodos={handleAdd} theme={theme} /> 
      {
        todos.length === 0 ? (
          <div>
            <h3>No Record</h3> 
          </div> 
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
                <span>
                  <BsFillTrashFill className={`icon ${theme}`} onClick={() => handleDelete(todo._id)} />
                </span>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}
