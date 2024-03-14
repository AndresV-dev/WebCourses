import { FaRegEyeSlash } from "react-icons/fa6";
import Button from "../components/Button";
import { login, register } from "../api/featchApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [typeForm, setTypeForm] = useState("login");
  const [typeInput, setTypeInput] = useState("password");
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    lastname: "",
    age: "",
    email: "",
    username: "",
    password: "",
  });

  const handleSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await login(JSON.stringify(loginInfo)).then(() => {
      navigate(`/dashboard`);
    });
  };

  const handleSubmitRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    register(JSON.stringify(registerInfo));
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <h1>Post It</h1>
        <header className="loginHeader">
          <Button label={"Login"} type="button" onClick={() => setTypeForm("login")} />
          <Button label={"Register"} type="button" onClick={() => setTypeForm("register")} />
        </header>
        {typeForm === "login" ? (
          <form action="/dashboard" onSubmit={handleSubmitLogin}>
            <div className="fieldsContainer">
              <div className="inputContainer">
                <input id="username" type="text" required onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })} />
                <label className="label" htmlFor="username">
                  Username / Email:
                </label>
              </div>
              <div className="inputContainer password">
                <input id="password" type={typeInput} required onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} />
                <label htmlFor="password" className="label">
                  Password:
                </label>
                <button
                  type="button"
                  className="showPassword"
                  onClick={() => {
                    setTypeInput(typeInput == "text" ? "password" : "text");
                  }}
                >
                  <FaRegEyeSlash className="showPasswordButton" />
                </button>
              </div>
            </div>
            <div className="buttonContainer">
              <Button type="submit" label="Login" />
              <Link to="/dashboard" className="basic-button ">
                Join As Guest
              </Link>
            </div>
          </form>
        ) : (
          <form action="/login" onSubmit={handleSubmitRegister}>
            <div className="inputContainer">
              <input id="name" type="text" required onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })} />
              <label className="label" htmlFor="name">
                Name:
              </label>
            </div>
            <div className="inputContainer">
              <input id="lastname" type="text" required onChange={(e) => setRegisterInfo({ ...registerInfo, lastname: e.target.value })} />
              <label className="label" htmlFor="lastname">
                LastName:
              </label>
            </div>
            <div className="inputContainer">
              <input id="email" type="text" required onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })} />
              <label className="label" htmlFor="email">
                E-Mail:
              </label>
            </div>
            <div className="inputContainer">
              <input id="age" type="text" required onChange={(e) => setRegisterInfo({ ...registerInfo, age: e.target.value })} />
              <label className="label" htmlFor="age">
                Age:
              </label>
            </div>
            <div className="inputContainer">
              <input id="username" type="text" required onChange={(e) => setRegisterInfo({ ...registerInfo, username: e.target.value })} />
              <label className="label" htmlFor="username">
                Username:
              </label>
            </div>
            <div className="inputContainer password">
              <input id="password" type={typeInput} required onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })} />
              <label htmlFor="password" className="label">
                Password:
              </label>
              <button
                type="button"
                className="showPassword"
                onClick={() => {
                  setTypeInput(typeInput == "text" ? "password" : "text");
                }}
              >
                <FaRegEyeSlash className="showPasswordButton" />
              </button>
            </div>
            <div className="buttonContainer">
              <Button type="submit" label="Register" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
