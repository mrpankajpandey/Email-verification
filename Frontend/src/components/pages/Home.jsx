import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div>
      <h1>Home Page</h1>
      <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
    </div>

    </div>
  )
}

export default Home