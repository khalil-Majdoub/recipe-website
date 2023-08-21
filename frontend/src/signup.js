import React, { useState } from "react";
import "./css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import Register from "./register";

const Signup = ({onclose, handleshowRegister, showRegister, handlehideRegister}) => {
  const [topic, setTopic] = useState('Register');
  const [showLogin, setshowLogin] = useState(false);
  const handleLogin = () =>{
    setshowLogin(true);
    handlehideRegister();
    setTopic('Login');
  }
  const handlehideLogin = () =>{
    setshowLogin(false);
    handleshowRegister();
    setTopic(Register)
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
        />
      )}
    </div>
  );
}
 
export default Signup;
