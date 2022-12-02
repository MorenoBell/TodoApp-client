import { ThemeContext } from '@emotion/react'
import React, { useContext, useState } from 'react'

function Todo(props) {
  const context = useContext(ThemeContext);
  const todo = props.todo;
  const [todoState, setTodoState] = useState(todo.checked)
  const deleteTodo = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todoId: todo._id })
    };
    fetch('/deleteTodo', requestOptions).then(
      response => response.json()
    ).then(
      data => {
        if (data.status) {
          props.getTodosByUser();
        }
        else {
          alert(data.message);
        }
      }
    )
  }
  function todoChange() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todoId: todo._id })
    };
    fetch('/changeTodoState', requestOptions).then(
      response => response.json()
    ).then(
      data => {
        if (data.status) {
          setTodoState(!todoState);
          todo.checked = !todo.checked;
        }
      }
    )
  }
  return (
    <div onClick={todoChange} className='text-white mt-3 hover:bg-emerald-800  rounded-xl border-solid border-2 px-5 py-2.5 justify-between flex text-xl font-semibold bg-slate-900 text-start border-slate-500'>
      <span>{todo.description}</span>
      <div className='flex'>
        <input type="checkbox" className="checked:bg-slate-900 rounded-full accent-emerald-500" onChange={() => setTodoState(!todoState)} checked={todoState} />
        <button onClick={deleteTodo} className='ml-10 accent-emerald-500'><i className="fa-solid accent-emerald-500 fa-trash"></i></button>
      </div>
    </div >
  )
}

export default Todo