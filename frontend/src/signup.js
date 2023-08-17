import React from "react";
import "./css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import Register from "./register"

const Signup = ({onclose, handleshowRegister, showRegister}) => {
  return (
    <div className="sign-up-container">
      <div>
        <span className="close-span">
          <FontAwesomeIcon icon={faXmark} className="close"  onClick={onclose}/>
        </span>
        <span className="register-span">
          <p>register</p>
        </span>
      </div>
      {showRegister &&(
        <Register 
          handleshowRegister ={handleshowRegister} 
          showRegister = {showRegister}
        />
      )}
    </div>
  );
}
 
export default Signup;
