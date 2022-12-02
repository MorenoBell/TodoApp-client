import { ThemeContext } from '@emotion/react'
import React from 'react'
import { useContext } from 'react'

function Homepage() {
  const context = useContext(ThemeContext);
  return (
    <>
      <button type='button' onClick={() => context.logout}>Logout</button>
    </>
  )
}

export default Homepage