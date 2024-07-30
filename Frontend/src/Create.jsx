import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function Create({ setTodos }) {
  const [task, setTask] = useState('');

  const handleAdd = async () => {
    if (task.trim() === '') return;

    try {
      const response = await axios.post('/api/todos', { task });
      console.log('Todo added:', response.data); // Debugging output
      setTodos(prevTodos => [...prevTodos, response.data]); // Update state with new todo
      setTask(''); // Clear the input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
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

Create.propTypes = {
  setTodos: PropTypes.func.isRequired,
};
