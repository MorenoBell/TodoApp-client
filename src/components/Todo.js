import { ThemeContext } from '@emotion/react'
import React, { useContext, useState } from 'react'

function Todo(props) {
  // const context = useContext(ThemeContext);
  const checkIcon = <i className='fa-solid fa-check'></i>;
  const uncheckIcon = <i className="fa-solid fa-x"></i>
  const todo = props.todo;
  let timestamp = 0;
  const [todoDescription, setTodoDescription] = useState(todo.description)
  const [todoState, setTodoState] = useState(todo.checked)
  const [editing, setEditing] = useState(false)
  const [todoIcon, setTodoIcon] = useState(!todoState ? checkIcon : uncheckIcon)
  const [backGroundColor, setBackGroundColor] = useState(todoState ? 'bg-emerald-800' : 'bg-slate-900');

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
      setTodoIcon(checkIcon);
    }
    else {
      setBackGroundColor('bg-emerald-800')
      setTodoIcon(uncheckIcon);
    }
  }
  function modifyTodo() {

    setEditing(false);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todoId: todo._id, description: todoDescription })
    };
    fetch(process.env.REACT_APP_API_URL + '/modifyTodo', requestOptions).then(
      //   response => response.json()
      // ).then(
      response => {
        if (response.status) {
          todo.description = todoDescription;
        }
      }
    )
  }
  function touchEnd(event) {
    if (event.timeStamp - timestamp > 250) {
      setEditing(true);
    }
  }
  function touchStart(event) {
    timestamp = event.timeStamp;
  }
  return (
    <>
      {editing ?
        <div className='flex md:flex-row flex-col'>
          <input onChange={(e) => setTodoDescription(e.target.value)} autoFocus value={todoDescription} className={`text-white place-self-center mt-3 bg-slate-900 rounded-xl border-solid border-2 px-5 py-2.5 w-11/12 justify-between flex text-xl font-semibold text-start border-slate-500`}>
          </input>
          <button className='hover:bg-emerald-600  text-white ml-2 border-slate-500 border-solid border-2
      font-bold md:w-1/12 place-self-center md:mt-auto mt-3 rounded-xl cursor-pointer bg-slate-900' type='button' onClick={modifyTodo}><i className='fa-solid p-4 fa-check'></i></button>
        </div>
        :
        <div /*onClick={todoChange}*/ onDoubleClick={() => setEditing(true)} onTouchEnd={touchEnd} onTouchStart={touchStart} className={`text-white w-auto flex-wrap md:flex-row flex-col mt-3 ${backGroundColor} rounded-xl border-solid border-2 px-5 py-2.5  justify-between flex text-xl font-semibold text-start border-slate-500`}>
          <span className='place-self-center'>{todoDescription}</span>
          <div className='flex justify-evenly'>
            <button type="checkbox" className="checked:bg-slate-900 rounded-full accent-emerald-500" onClick={todoChange}>{todoIcon}</button>
            <button onClick={props.deleteTodo.bind(null, todo._id)} className='ml-5 accent-emerald-500'>{<i className="fa-solid accent-emerald-500 fa-trash"></i>}</button>
          </div>
        </div>
      }
    </>
  )
}

export default Todo