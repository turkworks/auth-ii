import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import Users from "./components/Users.js";
import Signin from "./auth/Signin.js";

class App extends Component {
  state = {
    users: []
  };

  render() {
    return (
      <div className="App">
        <h1>Users Page</h1>
        <nav>
          <NavLink to="/signin">SignIn</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <Route path="/api/users" component={Users} />
        <Route path="/api/signin" component={Signin} />
        {/* <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/users" component={Users} /> */}
      </div>
    );
  }
}

export default App;
