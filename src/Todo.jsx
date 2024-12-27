import React from 'react'
import Header from './components/Header'
import TodoBox from './components/TodoBox'

const Todo = () => {
  return (
    <div className="w-full max-w-2xl px-4">
      <Header />
      <TodoBox />
    </div>
  );
};

export default Todo