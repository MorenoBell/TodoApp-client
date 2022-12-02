import { React, useContext } from 'react'
import { ThemeContext } from '@emotion/react';
function User(props) {
  const context = useContext(ThemeContext);
  function deleteUser(id) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id })
    };
    fetch(process.env.REACT_APP_API_URL + '/deleteUser', requestOptions).then(
      response => response.json()
    ).then(props.getAllUsers)
  }
  const user = props.user;
  return (
    <>
      <button
        onClick={deleteUser.bind(null, user._id)}>
        {user.username}
      </button>
    </>
  )
}

export default User