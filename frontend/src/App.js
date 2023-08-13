import React,{useState} from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Signup from './signup';
import Navbar from './navbar';

function App() {
  const [showsignup, setshowignup] = useState(false);
  const handlesignupwindow = () =>{
    setshowignup(true);
  }
  const onclose = () => {
    setshowignup(false);
  }
  return (
    <div className="App">
      <Router>
        <Navbar  handlesignupwindow = {handlesignupwindow}/>
        {showsignup && <span className='width'> <Signup onclose={onclose} handlesignupwindow= {handlesignupwindow}/></span>  }
      </Router>
    </div>
  );
}

export default App;
