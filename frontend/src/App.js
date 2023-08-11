import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


import Navbar from './navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
