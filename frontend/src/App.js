import React, { useState } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./js/signup";
import Navbar from "./js/navbar";
import Menu from "./js/menu";
import Home from "./js/home";

function App() {
  const [showsignup, setshowignup] = useState(false);
  const [check, setcheck] = useState(false);

  const handlesignupwindow = () => {
    setshowignup(true);
  };

  const onclose = () => {
    setshowignup(false);
  };

  const [shownav, setshownav] = useState(false);

  const handlenav = () => {
    if (shownav) {
      setshownav(false);
    } else {
      setshownav(true);
    }
  };

  const [showRegister, setshowRegister] = useState(true);
  const handleShowRegister = () => {
    setshowRegister(true);
  };
  const handlehideRegister = () => {
    setshowRegister(false);
  };
  return (
    <div className="App">
      <Router>
        <Navbar
          handlesignupwindow={handlesignupwindow}
          handlenav={handlenav}
          onclose={onclose}
          showsignup={showsignup}
          showRegister={showRegister}
          handleShowRegister={handleShowRegister}
        />
        {showsignup && (
          <span className="width">
            <Signup
              onclose={onclose}
              handlesignupwindow={handlesignupwindow}
              showRegister={showRegister}
              handleshowRegister={handleShowRegister}
              handlehideRegister={handlehideRegister}
              check={check}
              setcheck={setcheck}
            />
          </span>
        )}
        <Menu
          shownav={shownav}
          handlesignupwindow={handlesignupwindow}
          handlenav={handlenav}
        />
        <Routes>
          <Route path="/" exact element={<Home check= {check} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
