import { Link } from "react-router-dom";
import Button from "../components/Button";
import { login } from "../api/TaskApi";

function Login() {

  const loginInfo = {
    username: "",
    password: ""
  }
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login(JSON.stringify(loginInfo));
  }

  return (
    <div className="login">
      <h1>Post It</h1>
      <form action="/dashboard" onSubmit={handleSubmit}>
        <header><h3>Login</h3></header>
        <div className="fieldsContainer">
          <label htmlFor="username">Username / Email</label> <input id="username" type="text" onChange={e => loginInfo.username = e.target.value} />
          <label htmlFor="password">Password</label> <input id="password" type="password" onChange={e => loginInfo.password = e.target.value}/>
        </div>
        <div className="buttonContainer">
          <Button type="submit" label="Login" />
          <Link to={"/dashboard"} />
          <p>Don't Have an Account? <Link to={'/register'}>Register</Link></p>
        </div>
      </form>
    </div>
  );
}


  export default Login;
