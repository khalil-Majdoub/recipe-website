import React from "react";
import "./css/menu.css";


const Menu = ({shownav, handlesignupwindow, handlenav}) => {
  const handle = () =>{
    handlenav();
    handlesignupwindow();
  }
  return (
    <div className="menu-container">
      {shownav &&  
        <span className="menu">
          <nav>
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
                <button onClick={handle} >signup</button>
              </li>
            </ul>
          </nav>
        </span>}
    </div>
  );
}
 
export default Menu;