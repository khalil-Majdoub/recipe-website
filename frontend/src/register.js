import React from "react";
import "./css/register.css"


const Register = ({showRegister, handleshowRegister}) => {
  return (
    <div className="register-container">
      <form>
        <ul>
          <li>
          <label htmlFor="email">email</label>
          <input type="email" id="email" className="email"/>
          </li>
          <li>
            <label htmlFor="username">username</label>
            <input type="text" id="username" className="username"/>
          </li>
          <li>
            <label htmlFor="password">password</label>
            <input type="password" id="password" className="password"/>
          </li>
          <li>
            <p>
              do you have account &nbsp;<span>login</span>
            </p>
          </li>
          <li>
            <button>register</button>
          </li>
        </ul>
      </form>
    </div>
    
  );
}
 
export default Register;
