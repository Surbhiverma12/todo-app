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
        setTodo(todo.filter((todos) => {
            todos.id!=id
        }))
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
          <div className="flex w-full space-x-3">
            <input
              value={input}
              type="text"
              onChange={getInput}
              placeholder="Write your task..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button
              onClick={addInput}
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
            >
              Add
            </button>
          </div>
    
          <div className="mt-6">
            {todo.length < 1 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No tasks available</p>
                <p className="text-sm mt-1">Add a task to get started</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {todo && todo.map((todos) => (
                  <li
                    key={todos.id}
                    className="px-4 py-3 bg-gray-50 rounded-lg flex items-center justify-between group hover:bg-gray-100 transition-all"
                  >
                   {editInput.id && editInput.id === todos.id ? 
                   (
                    <>
                        <input
                            value={editInput.task}
                            type="text"
                            onChange={(e) => {setEditInput({...editInput, task: e.target.value})
                            console.log(editInput.task)
                          }}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <button
                        onClick={() => saveEditInput(todos.id)}
                        className="opacity-100 text-green-500 group-hover:text-green-600 transition-all"
                            >
                        Save
                        </button>
                    </>
                   )
                   :
                   (
                   <>
                   <span className="text-gray-700">{todos.task}</span>
                    <button
                      onClick={() => getEditInput(todos)}
                      className="opacity-100 text-indigo-500 group-hover:text-indigo-600 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={()=>deleteTodo(todos.id)}
                      className="opacity-100 group-hover:text-red-500 hover:text-red-600 transition-all"
                    >
                      Delete
                    </button>
                    </>
                   )
                }
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
}

export default TodoBox