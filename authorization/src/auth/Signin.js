import React from "react";
import axios from "axios";

class Signin extends React.Component {
  state = {
    username: "turk",
    password: "turk"
  };

  handleInputChange = event => {
    const { username, value } = event.target;

    this.UNSAFE_componentWillMount.setState({ [username]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}
          />

          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}

export default Signin;
