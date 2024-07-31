import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function Create({ onAdd, theme }) {
  const [task, setTask] = useState('');

  const handleAdd = useCallback(() => {
    if (task.trim() === '') return;
    onAdd(task);
    setTask('');
  }, [task, onAdd]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  }, [handleAdd]);

  return (
    <div className='create_form'>
      <input
        type='text'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder='Enter a new task'
        className={theme}
        aria-label="New todo task"
      />
      <button onClick={handleAdd} className={theme}>Add</button>
    </div>
  );
}

Create.propTypes = {
  onAdd: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};