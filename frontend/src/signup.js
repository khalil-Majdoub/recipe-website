import React from "react";
import "./css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";

const Signup = ({onclose}) => {
  return (
    <div className="sign-up-container">
      <span className="close-span">
        <FontAwesomeIcon icon={faXmark} className="close"  onClick={onclose}/>
      </span>
      <span className="register-span">
        <p>register</p>
      </span>
    </div>
  );
}
 
export default Signup;