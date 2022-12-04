import { useState, useContext } from 'react';
import { ThemeContext } from '@emotion/react';
import RegisterForm from './RegisterForm';
function LoginForm() {
  const context = useContext(ThemeContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('');
  const [registerForm, setregisterForm] = useState(false);
  const loginButtonClick = () => {

    setLoginError(<i className="fa-solid fa-spinner fa-xl text-white"></i>)
    loginUser(username, password)
  }
  const loginUser = (username, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    fetch(process.env.REACT_APP_API_URL + '/loginUser', requestOptions)
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
      });
  }
  return (
    <div className='bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 h-screen box-shadow px-10 py-10 place-content-center'>
      <button className='hover:bg-emerald-600 text-white md:text-xl border-slate-500 border-solid border-2
      font-bold py-5 px-4 w-auto place-self-center mt-auto rounded-xl bg-slate-900' onClick={() => setregisterForm(!registerForm)}>
        {registerForm ? 'Login' : 'Sign in'}
      </button>
      {registerForm
        ? <RegisterForm loginUser={loginUser} setregisterForm={setregisterForm} />
        :
        <>      <span className='text-white font-bold text-2xl flex justify-center mb-10'>Login</span>
          <form autoComplete='on' className='h-auto flex flex-col md:mx-36 relative bg-slate-800 w-auto px-16 py-12 rounded-3xl lg:mx-64 xl:mx-72 2xl:mx-96 grid-rows-3'>
            <input autoFocus autoComplete="username" onInput={() => setLoginError('')} className='bg-slate-900 md:w-4/5 place-self-center mt-5 text-center text-white rounded-xl border-solid border-2 border-slate-500 font-bold py-4 px-5 md:text-xl' type={"text"} onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username'></input>
            <input autoComplete="password" onInput={() => setLoginError('')} className='bg-slate-900 mt-5 md:w-4/5 place-self-center text-center  text-white rounded-xl border-solid border-2 border-slate-500  font-bold py-4 px-5 md:text-xl' type={"password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password'></input>
            <span className='place-self-center my-8 text-red-500'>{loginError}</span>
            <button className='hover:bg-emerald-600 text-white md:text-xl border-slate-500 border-solid border-2
      font-bold py-5 px-4 md:w-2/5 place-self-center mt-auto rounded-xl bg-slate-900' type='button' onClick={loginButtonClick} >Login</button>
          </form>
        </>
      }
    </div>
  )
}

export default LoginForm