import React,{useState} from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Signup from './signup';
import Navbar from './navbar';
import Menu from './menu';

function App() {
  const [showsignup, setshowignup] = useState(false);
  const handlesignupwindow = () =>{
    setshowignup(true);
  }
  const onclose = () => {
    setshowignup(false);
  }
  const [shownav, setshownav] = useState(false);

  const handlenav = () => {
    if (shownav) {
      setshownav(false);
    }else{
      setshownav(true);
    }
  }
  return (
    <div className="App">
      <Router>
        <Navbar  handlesignupwindow = {handlesignupwindow} handlenav={handlenav} onclose = {onclose} showsignup = {showsignup} />
        {showsignup && <span className='width'> <Signup onclose={onclose} handlesignupwindow= {handlesignupwindow}/></span>}
        <Menu shownav={shownav} handlesignupwindow={handlesignupwindow} handlenav={handlenav} />
      </Router>
    </div>
  );
}

export default App;
