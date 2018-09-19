import React from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
      <div className="login-container">
        <div className="noaccount">
        <span>Don't have an account?</span>
        <Button className="btn-login" onClick={this.props.signup}>Create one</Button>
        </div>
        <div className="login-form">
          <h2 className="display-4">Sign in to</h2>
          <h1 className="display-1">Criboard</h1>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Enter username" name="username" value={this.state.usernamel} onChange={this.onChange.bind(this)} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} />
          </div>
          <Button className="btn-login" onClick={() => this.props.onSubmit(this.state.username, this.state.password)}>Sign in</Button>
        </div>
      </div>
    );
  }
}

export default Login;