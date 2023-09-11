import React, { useState,useEffect } from "react";
import "../css/login.css"
import axios from "./axios";

const LOGIN_URL = '/login'

const Login = ({
  handleLoginsubmit,

  style, 
  handlehideLogin
}) => {

  const [emailValue, setemailValue] = useState("");
  const [usernameValue, setusernameValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  const [emailUsed, setemailUsed]= useState(false);
  const [nameUsed, setnameUsed] = useState(false);
  const [passwordUsed, setpasswordUsed] = useState(false);

  const [emailFocus, setemailFocus] = useState(false);
  const [usernameFocus, setusernameFocus] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const handleEmailChange = (event) =>{
    setemailValue(event.target.value);
  }
  const handleUsernameChange = (event) =>{
    setusernameValue(event.target.value);
  }
  const handlePasswordChange = (event) =>{
    setpasswordValue(event.target.value);
  }

  const user = usernameValue.toString().toLowerCase();

  const handleLogin = async() => {
    if (emailValue !== ""){
      try{
        const data = {
          email:emailValue,
          userName:user,
          password:passwordValue
        };
        const res = await axios.post('/login',
          JSON.stringify(data),{
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          });
        if (res.data.emailUsed){
          setemailUsed(true);
        }else{
          setemailUsed(false);
        }
        if (res.data.userUsed){
          setnameUsed(true);
        }else{
          setnameUsed(false);
        }
        if (res.data.passUsed){
          setpasswordUsed(true);
        }else{
          setpasswordUsed(false);
        }

      }catch(err){
        console.error('login err:',err);
      }
    }
  }
  const handleEmailFocus = () => {
    setemailFocus(true);
    if (emailValue!=="")
    {
      handleLogin();
    }
  }
  const handleusernameFocus = () => {
    setusernameFocus(true);
    if (usernameValue!==""){
      handleLogin();
    }
  }    
  const handlepasswordFocus = () => {
    setpasswordFocus(true);
    if(passwordValue!==""){
      handleLogin();
    }
  }
  useEffect(()=>{
    handlepasswordFocus();
    return (handlepasswordFocus)
  },[passwordValue])
  

  const handleemailBlur = () => {
    setemailFocus(false);
    
    
  }
  const handleusernameBlur = () => {
    setusernameFocus(false);
    
  }
  const handlepasswordBlur = () => {
    setpasswordFocus(false);
    
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
            onBlur={handleemailBlur}
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
              onBlur={handleusernameBlur}
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
              onBlur={handlepasswordBlur}
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