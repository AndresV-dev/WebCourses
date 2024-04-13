import { FaRegEyeSlash } from "react-icons/fa6";
import Button from "../components/Button";
import Notification from "../components/Notification";
import { getCategories, getCollections, getPriorities, login, register } from "../api/featchApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
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

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const loginDefault = async () => {
    await login(
      JSON.stringify({
        username: process.env.VITE_USERNANE,
        password: process.env.VITE_PASSWORD,
      })
    );
    await getPriorities();
    await getCategories();
    await getCollections().then(() => {
      navigate(`/dashboard`);
    });
  };

  const handleSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await login(JSON.stringify(loginInfo));

    if (sessionStorage.error !== undefined) {
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.removeItem("error");
      }, 10000);
    } else {
      await getPriorities();
      await getCategories();
      await getCollections().then(() => {
        navigate(`/dashboard`);
      });
    }
  };

  const handleSubmitRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    register(JSON.stringify(registerInfo));
  };

  return (
    <div className="loginContainer">
      <Notification template={"error"} isVisible={isVisible} />
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
                <input name="username" type="text" required onChange={handleChangeLogin} />
                <label className="label" htmlFor="username">
                  Username / Email:
                </label>
              </div>
              <div className="inputContainer password">
                <input name="password" type={typeInput} required onChange={handleChangeLogin} />
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
              <Button name="login" type="submit" label="Login" />
              <Button name="guest" type="button" onClick={loginDefault} label="Join As Guest" />
            </div>
          </form>
        ) : (
          <form action="/login" onSubmit={handleSubmitRegister}>
            <div className="inputContainer">
              <input name="name" type="text" required onChange={handleChangeRegister} />
              <label className="label" htmlFor="name">
                Name:
              </label>
            </div>
            <div className="inputContainer">
              <input name="lastname" type="text" required onChange={handleChangeRegister} />
              <label className="label" htmlFor="lastname">
                LastName:
              </label>
            </div>
            <div className="inputContainer">
              <input name="email" type="text" required onChange={handleChangeRegister} />
              <label className="label" htmlFor="email">
                E-Mail:
              </label>
            </div>
            <div className="inputContainer">
              <input name="age" type="text" required onChange={handleChangeRegister} />
              <label className="label" htmlFor="age">
                Age:
              </label>
            </div>
            <div className="inputContainer">
              <input name="username" type="text" required onChange={handleChangeRegister} />
              <label className="label" htmlFor="username">
                Username:
              </label>
            </div>
            <div className="inputContainer password">
              <input name="password" type={typeInput} required onChange={handleChangeRegister} />
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
