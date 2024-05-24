import {useState} from 'react'
import { Link } from "react-router-dom";
import { useSignup } from '../hooks/useSignup';
import {TailSpin} from 'react-loader-spinner'
const Signup=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {signup, error, isLoading}=useSignup()
    const handleSubmit=async(e)=>{
        e.preventDefault()

        await signup(email, password)
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
        <button disabled={isLoading} type="submit">
          Sign up
        </button>
        {error && <div className="error">{error}</div>}
        {isLoading && (
          <div className="loader">
            <TailSpin color="#00BFFF" height={80} width={80} />
          </div>
        )}
      </form>
    );
}
export default Signup