import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { TailSpin } from "react-loader-spinner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,error,isLoading}=useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password)
    console.log(email, password);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
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
      <p id="LoginMsg">
        Not Registered yet <Link to="/signup">Register here</Link>{" "}
      </p>
      <button disabled={isLoading} type="submit">Log in</button>
      {error && <div className="error">{error}</div>}
      {isLoading && (
        <div className="loader">
          <TailSpin color="#397c30" height={80} width={80} />
        </div>
      )}
    </form>
  );
};
export default Login;
