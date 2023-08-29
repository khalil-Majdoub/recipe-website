import React, { useState } from "react";
import "./css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import Register from "./register";
import axios from "./axios";
import Login from "./login";

const Signup = ({onclose, handleshowRegister, showRegister, handlehideRegister}) => {

  const [emailValue, setemailValue] = useState("");
  const [usernameValue, setusernameValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  const [emailUsed, setemailUsed]= useState(false);
  const [nameUsed, setnameUsed] = useState(false);

  const [emailFocus, setemailFocus] = useState(false);
  const [usernameFocus, setusernameFocus] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const [topic, setTopic] = useState('Register');
  const [showLogin, setshowLogin] = useState(false);

  const handleEmailChange = (event) =>{
    setemailValue(event.target.value);
  }
  const handleUsernameChange = (event) =>{
    setusernameValue(event.target.value);
  }
  const handlePasswordChange = (event) =>{
    setpasswordValue(event.target.value);
  }

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

  const handleLogin = () =>{
    setshowLogin(true);
    handlehideRegister();
    setTopic('Login');
    setemailValue("");
    setusernameValue("");
    setpasswordValue("");
    setemailFocus(false);
    setusernameFocus(false);
    setpasswordFocus(false);


  }
  const handlehideLogin = () =>{
    setshowLogin(false);
    handleshowRegister();
    setTopic('Register');
    setemailValue("");
    setusernameValue("");
    setpasswordValue("");
    setemailFocus(false);
    setusernameFocus(false);
    setpasswordFocus(false);
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

  const handleLoginsubmit = (event) => {
    event.preventDefault();
    try{
      setemailValue('');
      setusernameValue('');
      setpasswordValue('');
    }catch(err){
      console.error(err);
    }
    onclose();
    
  }
  const style = {
    transform: 'translateY(-23px)',
  }
  return (
    <div className="sign-up-container">
      <div>
        <span className="close-span">
          <FontAwesomeIcon icon={faXmark} className="close"  onClick={onclose}/>
        </span>
        <span className="register-span">
          <p>{topic}</p>
        </span>
      </div>
      {showRegister &&(
        <Register 
          handleshowRegister ={handleshowRegister} 
          showRegister = {showRegister}
          onclose = {onclose}
          handleLogin = {handleLogin}

          handleEmailDe = {handleEmailDe}
          handleEmailChange={handleEmailChange}
          handleEmailFocus= {handleEmailFocus}
          handleemailBlur = {handleemailBlur}
          emailFocus = {emailFocus}
          emailUsed = {emailUsed}

          handleNameDe = {handleNameDe}
          handleUsernameChange = {handleUsernameChange}
          handleusernameFocus = {handleusernameFocus}
          handleusernameBlur = {handleusernameBlur}
          usernameFocus = {usernameFocus}
          nameUsed = {nameUsed}

          handlePasswordChange = {handlePasswordChange}
          handlepasswordFocus = {handlepasswordFocus}
          handlepasswordBlur = {handlepasswordBlur}
          passwordFocus = {passwordFocus}


          style = {style}
        />
      )}
      {showLogin && (
        <Login
          handleLoginsubmit = {handleLoginsubmit}

          emailUsed = {emailUsed}
          emailValue = {emailValue}
          handleEmailChange = {handleEmailChange}
          emailFocus ={emailFocus}
          handleEmailFocus = {handleEmailFocus}
          handleemailBlur = {handleemailBlur}

          nameUsed = {nameUsed}
          usernameValue = {usernameValue}
          handleUsernameChange = {handleUsernameChange}
          usernameFocus = {usernameFocus}
          handleusernameFocus = {handleusernameFocus}
          handleusernameBlur = {handleusernameBlur}

          passwordValue = {passwordValue}
          handlePasswordChange = {handlePasswordChange}
          passwordFocus = {passwordFocus}
          handlepasswordFocus = {handlepasswordFocus}
          handlepasswordBlur = {handlepasswordBlur}

          style = {style}
          handlehideLogin = {handlehideLogin}
          onclose = {onclose}
        />
      )}
    </div>
  );
}
 
export default Signup;
