import React, { useState } from "react";
import "../css/register.css";
import axios from "./axios";

const REGISTERURL = '/';

const Register = ({
  onclose, 
  handleLogin, 
  style
  
}) => {

  const [emailValue, setemailValue] = useState("");
  const [usernameValue, setusernameValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  const [emailFocus, setemailFocus] = useState(false);
  const [usernameFocus, setusernameFocus] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const [emailUsed, setemailUsed]= useState(false);
  const [nameUsed, setnameUsed] = useState(false);

  const handleEmailFocus = () => {
    setemailFocus(true);
  }
  const handleusernameFocus = () => {
    setusernameFocus(true);
  }
  const handlepasswordFocus = () => {
    setpasswordFocus(true);
  }

  const handleemailBlur = () => {
    setemailFocus(false);
    handleEmailDe();

  }
  const handleusernameBlur = () => {
    setusernameFocus(false);
    handleNameDe();
    
  }
  const handlepasswordBlur = () => {
    setpasswordFocus(false);
    
  }

  const handleEmailChange = (event) =>{
    setemailValue(event.target.value);
  }
  const handleUsernameChange = (event) =>{
    setusernameValue(event.target.value);
  }
  const handlePasswordChange = (event) =>{
    setpasswordValue(event.target.value);
  }

  const handleRegister = async(event) =>{
    event.preventDefault();
    try{
      const response = await axios.post(REGISTERURL,
      JSON.stringify({emailValue, usernameValue, passwordValue}),
      {
        headers:{ 'Content-Type': 'application/json' },
        withCredentials: true
      }
      )
      setemailValue('');
      setusernameValue('');
      setpasswordValue('');
    }catch(err){
      console.error(err);
    }
    onclose();
  }

  const handleEmailDe = async () => {
    if (emailValue !== "") {
      try {
        const res = await axios.get("/check", {
          params : {emailValue}
        }); // Send the emailValue to the backend for checking
        if (res.data.emailUsed) {
          setemailUsed(true);
        } else {
          setemailUsed(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleNameDe = async () => {
    if (usernameValue !== "") {
      try {
        const res = await axios.get("/check", {
          params : {usernameValue}
        }); // Send the nameValue to the backend for checking
        if (res.data.nameUsed) {
          setnameUsed(true);
        } else {
          setnameUsed(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  const find = emailValue.toLowerCase().includes('@')
  const disabled = passwordValue.length<8 || usernameValue.length<6 || nameUsed || !find|| emailUsed;
  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
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
              do you have an account &nbsp;<span className="login-span" onClick={handleLogin}>login</span>
            </p>
          </li>
          <li className="li-button">
            <button onClick={handleRegister} type="submit" disabled = {disabled} >register</button>
          </li>
        </ul>
      </form>
    </div>
    
  );
}
 
export default Register;
