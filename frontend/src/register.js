import React from "react";
import "./css/register.css"


const Register = ({showRegister, handleshowRegister}) => {
  return (
    <div className="register-container">
      <form>
        <ul>
          <li>
            <label htmlFor="username">username</label>
            <input id="username" className="username"/>
          </li>
        </ul>
      </form>
    </div>
    
  );
}
 
export default Register;
