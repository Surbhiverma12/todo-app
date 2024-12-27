import React, { useState } from 'react';
import {v4 as uuid} from 'uuid'

const TodoBox = () => {

  const [todo, setTodo] = useState([])
  const [input, setInput] = useState('')

  const [editInput, setEditInput] = useState({task: '', id: null})

  const getEditInput = (todos) => {
    // console.log(todos)
    setEditInput({task: todos.task, id: todos.id})
  }
  console.log(editInput.task)

  const saveEditInput = (id) => {
    setTodo((todos) => (
        todos.map((todo) => (
            todo.id === id ? 
            {...todo, task: editInput.task} :
            todo
        )
        )
    ))
    setEditInput({
      task: '',
      id: null
    })
  }
  console.log(todo)

    const getInput = (e) => {
        setInput(e.target.value)
        console.log(input)
    }

    const addInput = () =>{
        const newTodo = {
            task: input,
            id: uuid()
        }
        setTodo((preTodo) => 
            [...preTodo, newTodo]
        )
        setInput('')
    }
    // console.log(todo)

    const deleteTodo = (id) => {
        setTodo([...todo.filter((todos) => 
            todos.id!=id)])
    }

    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 max-w-4xl w-full mx-auto border border-gray-100">
        <div className="flex flex-col sm:flex-row w-full gap-3">
          <input
            value={input}
            type="text"
            onChange={getInput}
            placeholder="Write your task..."
            className="flex-1 px-6 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg placeholder:text-gray-400"
          />
          <button
            onClick={addInput}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all text-lg font-medium shadow-lg shadow-indigo-500/20"
          >
            Add Task
          </button>
        </div>
  
        <div className="mt-10">
          {todo.length < 1 ? (
            <div className="text-center py-16 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-xl text-gray-600 font-medium">No tasks available</p>
              <p className="text-base mt-2 text-gray-500">Add a task to get started</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {todo && todo.map((todos) => (
                <li
                  key={todos.id}
                  className="p-5 bg-gray-50/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between group hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-indigo-100"
                >
                  {editInput.id && editInput.id === todos.id ? (
                    <div className="flex flex-col sm:flex-row w-full gap-3">
                      <input
                        value={editInput.task}
                        type="text"
                        onChange={(e) => setEditInput({...editInput, task: e.target.value})}
                        className="flex-1 px-6 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-base"
                      />
                      <button
                        onClick={() => saveEditInput(todos.id)}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-medium shadow-lg shadow-green-500/20"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-lg text-gray-700 break-all px-2">{todos.task}</span>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => getEditInput(todos)}
                          className="flex-1 sm:flex-none px-6 py-3 text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(todos.id)}
                          className="flex-1 sm:flex-none px-6 py-3 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all font-medium"
                        >
                          Delete
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
}

export default TodoBox