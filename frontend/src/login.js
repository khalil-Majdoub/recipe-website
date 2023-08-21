import React from "react";

const Login = () => {
  
  return (
    <div>
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
              do you have account &nbsp;<span className="login-span" onClick={handleLogin}>login</span>
            </p>
          </li>
          <li className="li-button">
            <button onClick={handleRegister} type="submit" >register</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
 
export default Login;