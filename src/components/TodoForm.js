import { ThemeContext } from '@emotion/react'
import React, { useContext, useState } from 'react'

function TodoForm(props) {
  const context = useContext(ThemeContext);
  const [todoDescription, setTodoDescription] = useState('')
  function addTodo() {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: context.userId, description: todoDescription })
    }
    fetch('/addTodo', reqOptions).then(
      response => response.json()
    ).then(
      () => {
        props.setTodoFormVisible(false);
        props.getTodosByUser();
      }
    )
  }
  return (
    <>
      <input value={todoDescription} onChange={(e) => setTodoDescription(e.target.value)} placeholder='todo' className='bg-slate-900 md:w-4/5 mt-5 text-center
       place-self-center text-white rounded-xl border-solid border-2 border-slate-500 font-bold py-4 px-5 text-xl' autoFocus type={"text"}></input>
      <button className='hover:bg-emerald-600 text-white  text-xl  border-solid border-2
      font-bold py-5 px-4 md:w-2/5 place-self-center mt-10 rounded-xl bg-slate-900' type='button' onClick={addTodo}>add todo</button>
    </>
  )
}

export default TodoForm