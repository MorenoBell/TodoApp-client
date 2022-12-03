import { ThemeContext } from '@emotion/react'
import React, { useContext, useState } from 'react'

function Todo(props) {
  const context = useContext(ThemeContext);
  const todo = props.todo;
  const [backGroundColor, setBackGroundColor] = useState('bg-slate-900');
  const [todoState, setTodoState] = useState(todo.checked)
  const deleteTodo = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todoId: todo._id, userId: context.userId })
    };
    fetch(process.env.REACT_APP_API_URL + '/deleteTodo', requestOptions).then(
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
    fetch(process.env.REACT_APP_API_URL + '/changeTodoState', requestOptions).then(
      response => response.json()
    ).then(
      data => {
        if (data.status) {
          todoCheckChange();
          todo.checked = !todo.checked;
        }
      }
    )
  }
  function todoCheckChange() {
    setTodoState(!todoState);
    if (todoState) {
      setBackGroundColor('bg-slate-900')
    }
    else {
      setBackGroundColor('bg-emerald-800')
    }
  }
  return (
    <div onClick={todoChange} className={`text-white mt-3 ${backGroundColor} hover:bg-emerald-800  rounded-xl border-solid border-2 px-5 py-2.5 justify-between flex text-xl font-semibold text-start border-slate-500`}>
      <span>{todo.description}</span>
      <div className='flex'>
        <input type="checkbox" className="checked:bg-slate-900 rounded-full accent-emerald-500" onChange={todoCheckChange} checked={todoState} />
        <button onClick={deleteTodo} className='ml-10 accent-emerald-500'><i className="fa-solid accent-emerald-500 fa-trash"></i></button>
      </div>
    </div >
  )
}

export default Todo