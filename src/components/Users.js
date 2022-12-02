import { useState, useEffect } from 'react'
import User from './User';
function Users(props) {
  const [users, setUsers] = useState([]);
  function getAllUsers() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    };
    fetch(process.env.REACT_APP_API_URL + '/allUsers', requestOptions).then(
      response => response.json()
    ).then(
      data => {
        setUsers(data.users)
      }
    )
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>{users.length == 0 ? 'Loading' :
      users.map((x, index) => {
        return <User key={index} user={x} getAllUsers={getAllUsers} />
      })
    }</div>

  )
}

export default Users