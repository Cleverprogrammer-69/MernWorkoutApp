import {useState} from 'react'
import { Link } from "react-router-dom";

const Signup=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()

        console.log(email, password)
    }
    return (
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <p id="SignupMsg">
          Already a Member <Link to="/login">Login here</Link>{" "}
        </p>
        <button type="submit">Sign up</button>
      </form>
    );
}
export default Signup