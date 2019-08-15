import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-task";
import EditTask from "./components/edit-task";
import TaskList from "./components/task-list";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            <Link to="/" className="navbar-brand">Task List App</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Task Items</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Task</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={TaskList} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/edit/:id" component={EditTask} />
        </div>
      </Router>
    );
  }
}

export default App;