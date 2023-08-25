import React, { useState } from "react";
import "./css/login.css"
import axios from "./axios";

const Login = ({
  handleLoginsubmit,

  emailValue,
  handleEmailChange, 
  emailFocus, 
  handleEmailFocus,
  handleemailBlur,
  emailUsed,

  usernameValue,
  handleUsernameChange,  
  usernameFocus,
  handleusernameFocus,
  handleusernameBlur,
  nameUsed,

  passwordValue,
  handlePasswordChange,
  passwordFocus,
  handlepasswordFocus,
  handlepasswordBlur,
  
  style, 
  handlehideLogin
}) => {
  const handleLogin = async(event) => {
    event.preventDefault();
    try{
      const res = axios('/login',{
        params: {
          emailValue:emailValue,
          usernameValue: usernameValue,
          passwordValue: passwordValue,
        }
      })
    }catch(err){
      console.error(err);
    }

  }
  const [passwordUsed, setpasswordUsed] = useState(false);
  const disableLogin = !passwordUsed|| !emailUsed || !nameUsed;
  return (
    <div className="login-container">
      <form onSubmit={handleLoginsubmit}>
        <ul>
          <li>
          <label htmlFor="email" style={emailFocus || emailValue !== "" ? style: undefined}>email</label>
          <input 
            type="email" 
            id="email" 
            className="email"
            value={emailValue}
            onChange={handleEmailChange}
            onFocus={handleEmailFocus}
            onBlur={handleLogin}
          />
          </li>
          <li>
            <label htmlFor="username" style={usernameFocus || usernameValue !== "" ? style: undefined}>username</label>
            <input 
              type="text" 
              id="username" 
              className="username"
              value={usernameValue}
              onChange={handleUsernameChange}
              onFocus={handleusernameFocus}
              onBlur={handleLogin}
            />
          </li>
          <li>
            <label htmlFor="password" style={passwordFocus || passwordValue !== "" ? style: undefined}>password</label>
            <input 
              type="password" 
              id="password" 
              className="password"
              value={passwordValue}
              onChange={handlePasswordChange}
              onFocus={handlepasswordFocus}
              onBlur={handleLogin}
            />
          </li>
          <li>
            <p>
              don't you have an account &nbsp;<span className="login-span" onClick={handlehideLogin}>Register</span>
            </p>
          </li>
          <li className="li-button">
            <button onClick={handleLoginsubmit} type="submit" disabled = {disableLogin} >Login</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
 
export default Login;