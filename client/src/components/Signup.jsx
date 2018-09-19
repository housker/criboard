import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordMatch: '',
      onDashboard: false,
      onLandingPage: false
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h1 className="display-4">Signup</h1>
          <div className="form-group">
            <label>Username</label>&nbsp;&nbsp;
            <input type="email" className="form-control" placeholder="Enter username" name="username" value={this.state.usernamel} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Email address</label>&nbsp;&nbsp;
            <input type="email" className="form-control" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Password</label>&nbsp;&nbsp;
            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Re enter Password</label>&nbsp;&nbsp;
            <input type="password" className="form-control" placeholder="Re enter Password" name="passwordMatch" value={this.state.passwordMatch} onChange={this.onChange.bind(this)} />
          </div>
          <button className="btn btn-primary" onClick={() => this.props.onSignup(this.state.username, this.state.email, this.state.password, this.state.passwordMatch)}>Submit</button>
      </div>
    );
  }
}

export default Signup;