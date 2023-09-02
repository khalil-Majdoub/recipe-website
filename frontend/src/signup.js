import React, { useState } from "react";
import "./css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import Register from "./register";
import Login from "./login";

const Signup = ({onclose, handleshowRegister, showRegister, handlehideRegister}) => {


  const [emailValue, setemailValue] = useState("");
  const [usernameValue, setusernameValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  const [emailFocus, setemailFocus] = useState(false);
  const [usernameFocus, setusernameFocus] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const [showLogin, setshowLogin] = useState(false);
  const [topic, setTopic] = useState('Register');


 
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
          onclose = {onclose}
          handleLogin = {handleLogin}
          style = {style}
        />
      )}
      {showLogin && (
        <Login
          handleLoginsubmit = {handleLoginsubmit}

          style = {style}
          handlehideLogin = {handlehideLogin}
          onclose = {onclose}
        />
      )}
    </div>
  );
}
 
export default Signup;
