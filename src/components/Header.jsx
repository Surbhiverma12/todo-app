import React from 'react'

const Header = () => {
  return (
    <div className="mt-12 mb-16 text-center space-y-4">
      <h1 className="text-5xl font-bold text-white tracking-tight drop-shadow-lg">
        Todo App
      </h1>
      <div className="relative">
        <p className="text-lg text-white/90 font-medium tracking-wide">
          Keep track of your daily tasks
        </p>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};
export default Header