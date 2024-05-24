import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const {user}=useAuthContext()
  const {logout}=useLogout()
  const handleLogOut=()=>{
    logout()
  }
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Workout Dairy</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <span className='email'>{user.email}</span>
              <button onClick={handleLogOut}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
