import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Create({ onAdd, theme }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() === '') return;
    onAdd(task);
    setTask('');
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
        className={theme}
      />
      <button onClick={handleAdd} className={theme}>Add</button>
    </div>
  );
}

Create.propTypes = {
  onAdd: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};