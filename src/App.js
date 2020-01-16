import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import CreateMentor from "./components/create-mentor.component";
import EditMentor from "./components/edit-mentor.component";
import MentorList from "./components/list-mentor.component";
import MentorTask from "./components/task-mentor.component";

function App() {
  return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Mentor App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Mentors</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Mentor</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={MentorList} />
          <Route path="/edit/:id" component={EditMentor} />
          <Route path="/create" component={CreateMentor} />
          <Route path="/task/:id" component={MentorTask} />
        </div>
      </Router>
  );
}

export default App;
