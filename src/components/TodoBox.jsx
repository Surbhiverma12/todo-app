import React, { useState, useEffect } from 'react';

const TodoBox = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editInput, setEditInput] = useState({task: '', id: null});
  
  // Simple ID generator function to replace uuid
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todo")) || [];
    if (todo) {
      setTodo(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const getEditInput = (todos) => {
    setEditInput({task: todos.task, id: todos.id});
  };

  const saveEditInput = (id) => {
    setTodo((todos) => (
      todos.map((todo) => (
        todo.id === id ? 
        {...todo, task: editInput.task} :
        todo
      ))
    ));
    setEditInput({
      task: '',
      id: null
    });
  };

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const addInput = () => {
    const newTodo = {
      task: input,
      id: generateId()
    };
    if(newTodo.task.length>0) {
      setTodo((preTodo) => [...preTodo, newTodo]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodo([...todo.filter((todos) => todos.id!=id)]);
  };

  const filteredTodos = todo.filter(item => 
    item.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 backdrop-blur-lg rounded-3xl shadow-xl p-8 max-w-4xl w-full mx-auto border border-violet-100">
      {/* Search Bar */}
      <div className="mb-8 relative">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full px-6 py-4 pl-12 bg-white/70 border-2 border-violet-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 text-lg placeholder:text-violet-300"
        />
        <svg 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" 
          width="20" 
          height="20" 
          fill="none" 
          strokeWidth="2" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Add Task Section */}
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <input
          value={input}
          type="text"
          onChange={getInput}
          placeholder="Write your task..."
          className="flex-1 px-6 py-4 bg-white/70 border-2 border-violet-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 text-lg placeholder:text-violet-300"
        />
        <button
          onClick={addInput}
          className="px-8 py-4 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-2xl hover:from-violet-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 transition-all duration-300 text-lg font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40"
        >
          <i className="fas fa-plus"></i> Add Task
        </button>
      </div>

      <div className="mt-10">
        {filteredTodos.length < 1 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-violet-200">
            <p className="text-xl text-violet-700 font-medium">
              {todo.length === 0 ? 'No tasks available' : 'No matching tasks found'}
            </p>
            <p className="text-base mt-2 text-violet-500">
              {todo.length === 0 ? 'Add a task to get started' : 'Try a different search term'}
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredTodos.map((todos) => (
              <li
                key={todos.id}
                className="p-5 bg-white/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between group hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-violet-100"
              >
                 {editInput.id && editInput.id === todos.id ? (
        <div className="flex flex-col sm:flex-row w-full gap-3">
          <input
            value={editInput.task}
            type="text"
            onChange={(e) => setEditInput({...editInput, task: e.target.value})}
            className="flex-1 px-6 py-3 bg-white border-2 border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 text-base"
          />
          <button
            onClick={() => saveEditInput(todos.id)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 font-medium shadow-lg shadow-emerald-500/20"
          >
            <i className="fa-regular fa-floppy-disk"></i>
          </button>
        </div>
      ) : (
        <>
          <span className="text-lg text-violet-900 break-all px-2">{todos.task}</span>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => getEditInput(todos)}
              className="flex-1 sm:flex-none px-6 py-3 text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100 transition-all duration-300 font-medium"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => deleteTodo(todos.id)}
              className="flex-1 sm:flex-none px-6 py-3 text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-100 transition-all duration-300 font-medium"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </>
      )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoBox;