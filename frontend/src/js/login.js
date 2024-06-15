import React, { useState, useEffect } from "react";
import "../css/login.css";
import axios from "./axios";

const Login = ({ register, handleLoginsubmit, style, check, setCheck }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailUsed, setEmailUsed] = useState(false);
  const [usernameUsed, setUsernameUsed] = useState(false);
  const [passwordUsed, setPasswordUsed] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [topic, setTopic] = useState("Register");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleFocus = (setter) => () => {
    setter(true);
  };

  const handleBlur = (setter) => () => {
    setter(false);
  };

  const user = username.toLowerCase();

  const login = async () => {
    if (email !== "") {
      try {
        const data = {
          email,
          userName: user,
          password,
        };
        const res = await axios.post("/login", JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setEmailUsed(res.data.emailUsed);
        setUsernameUsed(res.data.userUsed);
        setPasswordUsed(res.data.passUsed);
        setCheck(res.data.passUsed);
      } catch (err) {
        console.error("login err:", err);
      }
    }
  };

  useEffect(() => {
    login();
  }, [password]);

  const handleHideLogin = () => {
    setTopic("Register");
    setEmail("");
    setUsername("");
    setPassword("");
    setEmailFocus(false);
    setUsernameFocus(false);
    setPasswordFocus(false);
  };

  const disableLogin = !passwordUsed || !emailUsed || !usernameUsed;

  return (
    <div className="login-container">
      <form onSubmit={handleLoginsubmit}>
        <ul>
          <li>
            <label
              htmlFor="email"
              style={emailFocus || email !== "" ? style : undefined}
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              onFocus={handleFocus(setEmailFocus)}
              onBlur={handleBlur(setEmailFocus)}
              autoComplete="off"
            />
          </li>
          <li>
            <label
              htmlFor="username"
              style={usernameFocus || username !== "" ? style : undefined}
            >
              username
            </label>
            <input
              type="text"
              id="username"
              className="username"
              value={username}
              onChange={handleInputChange(setUsername)}
              onFocus={handleFocus(setUsernameFocus)}
              onBlur={handleBlur(setUsernameFocus)}
              autoComplete="off"
            />
          </li>
          <li>
            <label
              htmlFor="password"
              style={passwordFocus || password !== "" ? style : undefined}
            >
              password
            </label>
            <input
              type="password"
              id="password"
              className="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              onFocus={handleFocus(setPasswordFocus)}
              onBlur={handleBlur(setPasswordFocus)}
              autoComplete="off"
            />
          </li>
          <li>
            <p>
              don't you have an account &nbsp;
              <span className="login-span" onClick={() => { handleHideLogin(); register(); }}>
                Register
              </span>
            </p>
          </li>
          <li className="li-button">
            <button
              onClick={handleLoginsubmit}
              type="submit"
              disabled={disableLogin}
            >
              Login
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;