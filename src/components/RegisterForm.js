import { useState } from 'react'

function RegisterForm(props) {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [signInError, setSignInError] = useState('');
  const signInButtonClick = () => {
    if (password1 !== password2) {
      setSignInError('The two passwords must be indentical');
      return;
    }
    if (password1.length < 8) {
      setSignInError('Password must be 8 or more characters long');
      return;
    }
    setSignInError('');
    createNewUser()
      .then(response => response.json()).then((data) => {
        if (data.user) {
          props.loginUser(username, password1);
        }
        else {
          setSignInError(data.message);
        }
      });
  }
  function createNewUser() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, pwd: password1 })
    };
    return fetch(process.env.REACT_APP_API_URL + '/createNewUser', requestOptions);
  }
  return (
    <>
      <span className='text-white font-bold text-2xl flex justify-center mb-10'>Sign in</span>
      <div className='h-auto flex flex-col md:mx-36 relative bg-slate-800 w-auto px-16 py-12 rounded-3xl lg:mx-64 xl:mx-72 2xl:mx-96 grid-rows-3'>
        <input onChange={(e) => setUsername(e.target.value)} className='bg-slate-900 w-4/5 place-self-center mt-5 text-center text-white rounded-xl border-solid border-2 border-slate-500 font-bold py-4 px-5 text-xl' type={"text"} value={username} placeholder='Username'></input>
        <input onChange={(e) => setPassword1(e.target.value)} className='bg-slate-900 mt-5 w-4/5 place-self-center text-center  text-white rounded-xl border-solid border-2 border-slate-500  font-bold py-4 px-5 text-xl' type={"password"} value={password1} placeholder='Password'></input>
        <input onChange={(e) => setPassword2(e.target.value)} className='bg-slate-900 mt-5 w-4/5 place-self-center text-center  text-white rounded-xl border-solid border-2 border-slate-500  font-bold py-4 px-5 text-xl' type={"password"} value={password2} placeholder='Repeat password'></input>
        <span className='place-self-center my-11 text-red-500'>{signInError}</span>
        <button onClick={signInButtonClick} className='enabled:hover:bg-emerald-600 text-white text-xl border-slate-500 border-solid border-2
      font-bold py-5 px-4 w-2/5 place-self-center mt-auto rounded-xl bg-slate-900' type='button'>Sign in</button>
      </div>
    </>
  )
}

export default RegisterForm