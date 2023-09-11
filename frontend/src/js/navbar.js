import React from "react";
import logo from "./media/new logo.bd32996144276dcc79de.png";
import "../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const Navbar = ({handlesignupwindow, handlenav, onclose,showsignup, handleShowRegister}) => {

  const handle = () => {
    if (showsignup){
      onclose();
      handlenav();
    }else{
      handlenav();
    }
  }
  const handleSignUp = () =>{
    handleShowRegister();
    handlesignupwindow();
  }

  return (
    <div className="navbar-container">
      <div>
        <a href="/">
          <img src={logo} alt="logo"/>
        </a>
      </div>
      <span >
        <input type="text" id="search-input" placeholder="Search..."/>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </span>
      <div className="nav-container">
        <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={handle}/>
        <nav className="nav">
          <ul>
            <li>
              <a href="/" style={{ '--content-width': '56px', '--after-margin-right': '35svw'}}>
                home
              </a>
            </li>
            <li>
              <a href="/about-us" style={{ '--content-width': '85px', '--after-margin-right': '920px'}}>about us</a>
            </li>
            <li>
              <a href="/recipe" style={{ '--content-width': '63px', '--after-margin-right': '1063px'}}>recipe</a>
            </li>
            <li>
              <button onClick={handleSignUp} disabled = {showsignup} >signup</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
 
export default Navbar;