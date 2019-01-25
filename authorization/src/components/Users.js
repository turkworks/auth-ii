import React from "react";
import axios from "axios";

class Users extends React.Component {
  state = {
    users: []
  };

  // componentDidMount() {
  //   axios
  //     .get(`http://localhost:3000/api/users`)
  //     .then(response => {
  //       this.setState(() => ({ users: response.data }));
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  async componentDidMount() {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/users`;

    try {
      const response = await axios.get(endpoint);

      this.setState({ users: response.data.users });
    } catch (error) {
      console.error("we ran into an issue getting the users");
    }
  }

  render() {
    return (
      <div className="home-wrapper">
        <h1>List of Users</h1>
        <ul>
          {this.state.users.map(u => {
            return <li key={u.id}>{u.username}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Users;

// async componentDidMount() {
//   try {
//     const response = await axios.get(endpoints);

//     this.setState({users: response.data})
//   }.catch (error) {
//     console.error('we ran into an issue getting the users');
//   }
// }
