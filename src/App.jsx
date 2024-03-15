import React, { useState } from 'react';
import '../src/App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), name: newTodo, description: newDescription, status: 'not completed' }]);
      setNewTodo('');
      setNewDescription('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, newName, newDescription) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, name: newName, description: newDescription } : todo)));
  };

  const handleStatusChange = (id, newStatus) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, status: newStatus } : todo)));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.status === 'completed';
    } else if (filter === 'not completed') {
      return todo.status === 'not completed';
    } else {
      return true;
    }
  });

  return (
    <div className='body'>
      <h1 className='header'>Todo App</h1>
      <div>
        <input className='todoname' type="text" value={newTodo} onChange={handleInputChange} placeholder="Enter Todo" />
        <input className='tododesc'type="text" value={newDescription} onChange={handleDescriptionChange} placeholder="Enter Description" />
        <button className='addtodo' onClick={handleAddTodo}>Add Todo</button>
      </div>
      <h2 className='mytodo'>My Todo</h2>
      <div>
        Filter:
        <select className='filter' onChange={handleFilterChange} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>

      {filteredTodos.map(todo => (
        <div className='card' key={todo.id} >

        

          <h3 className='nametodo'>Name : {todo.name}</h3>

          <p className='desctodo'>Description: {todo.description}</p>

          <p className='status'>Status: {todo.status}</p>

          <button className='changestatus' onClick={() => handleStatusChange(todo.id, todo.status === 'completed' ? 'not completed' : 'completed')}>
            Change Status
          </button>

          <button className='editcolor' onClick={() => handleEditTodo(todo.id, prompt('Enter new task name', todo.name), prompt('Enter new description', todo.description))}>
            Edit
          </button>

          <button className='deletecolor' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>

      ))}
    </div>
  );
};

export default TodoApp;
