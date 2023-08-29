import React, { useState } from "react";
import "./css/login.css"
import axios from "./axios";

const LOGIN_URL = '/login'

const Login = ({
  handleLoginsubmit,

  emailFocus, 
  handleEmailFocus,
  handleemailBlur,

  usernameFocus,
  handleusernameFocus,
  handleusernameBlur,

  passwordFocus,
  handlepasswordFocus,
  handlepasswordBlur,
  
  style, 
  handlehideLogin
}) => {

  const [emailValue, setemailValue] = useState("");
  const [usernameValue, setusernameValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  const [emailUsed, setemailUsed]= useState(false);
  const [nameUsed, setnameUsed] = useState(false);
  const [passwordUsed, setpasswordUsed] = useState(false);

  const handleEmailChange = (event) =>{
    setemailValue(event.target.value);
  }
  const handleUsernameChange = (event) =>{
    setusernameValue(event.target.value);
  }
  const handlePasswordChange = (event) =>{
    setpasswordValue(event.target.value);
  }

  const handleEmailLogin = async(event) => {
    event.preventDefault();
    if (emailValue !== ""){
      try{
        const res = await axios.get(LOGIN_URL,{
          params: {
            email:emailValue,
          }
        })
        if (res.data.emailUsed){
          setemailUsed(true);
        }else{
          setemailUsed(false);
        }
      }catch(err){
        console.error('login err:',err);
      }
    }
  }
  const handleUserNameLogin = async(event) => {
    event.preventDefault();
    if (usernameValue!== ""){
      try{
        const res = await axios.get(LOGIN_URL,{
          params: {user: usernameValue}
        })
        if (res.data.nameUsed){
          setnameUsed(true);
        }else{
          setnameUsed(false);
        }
      }catch(err){
        console.error('login err:',err);
      }
    }

  }
  const handlePasswordLogin = async(event) => {
    event.preventDefault();
    if (passwordValue !== ""){
      try{
        const res = await axios.get(LOGIN_URL,{
          params: {password: passwordValue}
        })
        if (res.data.passwordUsed){
          setpasswordUsed(true);
        }else{
          setpasswordUsed(false);
        }
      }catch(err){
        console.error('login err:',err);
      }
    }
  }
  
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
            onBlur={handleEmailLogin}
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
              onBlur={handleUserNameLogin}
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
              onBlur={handlePasswordLogin}
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