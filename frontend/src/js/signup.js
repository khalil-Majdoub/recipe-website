import React, { useState } from "react";
import "../css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Register from "./register";
import Login from "./login";

const Signup = ({
  onclose,
  check,
  setcheck,
}) => {
  const [showRegister, setshowRegister] = useState(true);

  const [emailValue, setemailValue] = useState("");
  const [usernameValue, setusernameValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  const [showLogin, setshowLogin] = useState(false);
  const [Head,setHead] = useState("Register")

  //a solution
  const register=()=>{
    setshowRegister(true);
    setshowLogin(false);
    setHead("Register")
  }
  const login = () => {
    setshowRegister(false);
    setshowLogin(true);
    setHead("Login")
  }

  const handleLoginsubmit = (event) => {
    event.preventDefault();
    try {
      setemailValue("");
      setusernameValue("");
      setpasswordValue("");
    } catch (err) {
      console.error(err);
    }
    onclose();
  };
  const style = {
    transform: "translateY(-23px)",
  };
  return (
    <div className="sign-up-container">
      <div>
        <span className="close-span">
          <FontAwesomeIcon icon={faXmark} className="close" onClick={onclose} />
        </span>
        <span className="register-span">
          <p>{Head}</p>
        </span>
      </div>
      {showRegister && (
        <Register 
          login={login}
          onclose={onclose}  
          style={style} 
          />
      )}
      {showLogin && (
        <Login
          register={register}
          handleLoginsubmit={handleLoginsubmit}
          style={style}
          onclose={onclose}
          check={check}
          setcheck={setcheck}
        />
      )}
    </div>
  );
};

export default Signup;
