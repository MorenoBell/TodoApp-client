import { ThemeContext } from '@emotion/react';
import { React, useState } from 'react'
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import Todos from './components/Todos';
function App() {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const logout = () => {
    sessionStorage.removeItem('userId');
    setUserId('')
  }
  return (
    <ThemeContext.Provider value={{ logout, userId, setUserId }}>
      {userId ? <Todos /> : <LoginForm />}
    </ThemeContext.Provider>
  );
}

export default App