import { Link } from "react-router-dom";
import Button from "../components/Button";
import { User } from "../types";

function Login() {

  const loginInfo = {
    username: "",
    password: ""
  }
  
  async function loginFunction() {
    return fetch('http://localhost:8081/v1/auth/user/token', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
    .then(response => response.json())
    .then(res => () => {
      sessionStorage.setItem('user', JSON.stringify(res))

      let user: User = res as User;

      if (user.token !== undefined)
        sessionStorage.setItem('token', user.token)
    })
    .catch(error => {
      sessionStorage.setItem('error', error)})
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await loginFunction();
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
          <p>Don't Have an Account? <Link to={'/register'}>Register</Link></p>
        </div>
      </form>
    </div>
  );
}


  export default Login;