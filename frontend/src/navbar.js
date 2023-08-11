import React from "react";
import logo from "./media/new logo.bd32996144276dcc79de.png";
import "./css/navbar.css"

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div>
        <a href="/">
          <img src={logo} alt="logo"/>
        </a>
      </div>
      <div className="nav-container">
        <nav className="nav">
          <ul>
            <li>
              <a href="/" style={{ '--content-width': '56px', '--after-margin-right': '805px'}}>
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
              <button>signup</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
 
export default Navbar;