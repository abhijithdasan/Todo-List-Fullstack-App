import React, { useState } from 'react';
import axios from 'axios';

export default function Create({ setTodos }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() === '') return;

    axios.post('http://localhost:3001/add', { task })
      .then(response => {
        setTodos(prevTodos => [...prevTodos, response.data]);
        setTask('');
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className='create_form'>
      <input
        type='text'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder='Enter a new task'
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
