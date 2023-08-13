import React from "react";
import "./css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";

const Signup = ({onclose}) => {
  return (
    <div className="sign-up-container">
      <span>
        <FontAwesomeIcon icon={faXmark} className="close"  onClick={onclose}/>
      </span>
    </div>
  );
}
 
export default Signup;