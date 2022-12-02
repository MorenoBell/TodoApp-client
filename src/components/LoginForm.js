import { useState, useContext } from 'react';
import { ThemeContext } from '@emotion/react';
function LoginForm() {
  const context = useContext(ThemeContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('');
  const loginButtonClick = () => {

    setLoginError(<i className="fa-solid fa-spinner fa-xl text-white"></i>)
    loginUser()
      .then(response => response.json())
      .then((data) => {
        const id = data.id;
        if (id) {
          context.setUserId(id);
          sessionStorage.setItem('userId', id);
        }
        else {
          setLoginError('Wrong username or password');
        }
      })
  }
  const loginUser = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    return fetch(process.env.REACT_APP_API_URL + '/loginUser', requestOptions);
  }
  return (
    <div className='bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 h-screen box-shadow px-10 py-10 place-content-center'>
      <span className='text-white font-bold text-2xl flex justify-center mb-10'>Login</span>
      <div className='md:h-1/2  flex flex-col md:mx-36 relative bg-slate-800 w-auto px-16 py-12 rounded-3xl lg:mx-64 xl:mx-72 2xl:mx-96 grid-rows-3'>
        <input onInput={() => setLoginError('')} className='bg-slate-900 w-4/5 place-self-center mt-5 text-center text-white rounded-xl border-solid border-2 border-slate-500 font-bold py-4 px-5 text-xl' type={"text"} onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username'></input>
        <input onInput={() => setLoginError('')} className='bg-slate-900 mt-5 w-4/5 place-self-center text-center  text-white rounded-xl border-solid border-2 border-slate-500  font-bold py-4 px-5 text-xl' type={"password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password'></input>
        <span className='place-self-center mt-11 text-red-500'>{loginError}</span>
        <button className='hover:bg-emerald-600 text-white text-xl border-slate-500 border-solid border-2
      font-bold py-5 px-4 w-2/5 place-self-center mt-auto rounded-xl bg-slate-900' type='button' onClick={loginButtonClick}>Login</button>
      </div>
    </div>
  )
}

export default LoginForm