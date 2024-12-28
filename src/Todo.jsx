import React from 'react'
import Header from './components/Header'
import TodoBox from './components/TodoBox'

const Todo = () => {
  return (
    <div className="w-full max-w-4xl px-4 py-8 mx-auto">
      <Header />
      <TodoBox />
    </div>
  );
};

export default Todo