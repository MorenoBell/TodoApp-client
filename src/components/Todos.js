import { ThemeContext } from '@emotion/react';
import React, { useContext, useState, useEffect } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm';
function Todos() {
  const context = useContext(ThemeContext);
  const [todos, setTodos] = useState([]);
  const [todoFormVisible, setTodoFormVisible] = useState(false);
  function getTodosByUser() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: context.userId })
    };
    fetch(process.env.REACT_APP_API_URL + '/getTodosByUser', requestOptions).then(
      response => response.json()
    ).then(
      data => {
        setTodos(data.todos || [])
      }
    )
  }
  useEffect(() => {
    getTodosByUser();
  }, []);

  const deleteTodo = (todoId) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todoId: todoId, userId: context.userId })
    };
    fetch(process.env.REACT_APP_API_URL + '/deleteTodo', requestOptions).then(
      response => response.json()
    ).then(
      data => {
        if (data.status) {
          setTodos(todos.filter(t => t._id != todoId));
          // getTodosByUser();
        }
        else {
          alert(data.message);
        }
      }
    )
  }
  return (
    <div className='bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 min-h-screen box-shadow px-10 py-10 place-content-center'>
      <div className='flex justify-between mb-5'>
        <button type='button' className='text-white hover:bg-emerald-600 border-solid border-2 rounded-lg py-3 px-6' onClick={() => setTodoFormVisible(!todoFormVisible)}>{todoFormVisible ? 'go back' : 'new todo'}</button>
        <button type='button' className='text-white hover:bg-emerald-600 border-solid border-2 rounded-lg py-3 px-6' onClick={() => context.logout()}>Logout</button>
      </div>
      {
        <div className='h-auto flex flex-col md:mx-12 relative bg-slate-800 w-auto md:px-16 px-4 py-12 rounded-3xl lg:mx-64 xl:mx-72 2xl:mx-96 grid-rows-3'>

          {todoFormVisible ?
            <TodoForm getTodosByUser={getTodosByUser} setTodoFormVisible={setTodoFormVisible} />
            :
            (todos.length > 0 ?
              todos.map((todo, index) => {
                return <Todo key={index} todo={todo} getTodosByUser={getTodosByUser} deleteTodo={deleteTodo} />
              }) : <span className='text-white mt-3 place-self-center  px-5 py-2.5 text-xl font-semibold '>No elements found</span>)
          }
        </div>
      }
    </div>
  )
}

export default Todos