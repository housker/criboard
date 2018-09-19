import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './Nav.jsx';
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard.jsx';
import Issues from '../components/Issues.jsx';
import Issbook from '../components/Issbook.jsx';
import Issupplies from '../components/Issupplies.jsx';
import Address from '../components/Address.jsx';
import Group from '../components/Group.jsx';
import Help from '../components/Help.jsx';
import PickGroup from '../components/PickGroup.jsx';
import DeleteGroup from '../components/DeleteGroup.jsx';
import AddTransaction from '../components/AddTransaction.jsx';
import UserFinances from '../components/UserFinances.jsx';
import Activity from '../components/Activity.jsx';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import Logout from '../components/Logout.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user: '',
      login: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.signup= this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }

  onSubmit(username, password) {
    var data = {
      username: username,
      password: password
    };
    axios.post('/loginuser', data)
    .then(result => {
      if (result) {
        this.setState({user: result.data}, () => alert(`${this.state.user} is logged in!`))
      }
    })
    .catch(err => {
      alert('Incorrect username and/or password');
      this.setState({
          onLandingPage: true
      })
    })
  }

  onSignup(username, email, password, passwordMatch) {
    if (username === '' || email === '' || password === '')  {
      alert('username, email and password fields cannot be empty. Enter new values');
      // stay on signup page
    } else {
      var data = {
        username: username,
        email: email,
        password: password,
        passwordMatch: passwordMatch
      };
      axios.post('./signupuser', data)
      .then(result => {
        console.log(result);
        if (result.data === 'user created') {
          alert(`${username} just signed up for Criboard!`);
          // redirect to Dashboard after signup
          this.setState({
            user: username
          })
        } else if (result.data === 'user already exists') {
          alert(`${this.state.username} already exists. Please login as ${this.state.username} or signup as a different user`)
        } else {
          var errors = result.data;
          var messages = errors.map((error) => {
            return error.msg;
          });
          alert(messages);
          this.setState({
            username: '',
            email: '',
            password: '',
            passwordMatch: ''
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  signup() {
    this.setState({login: false})
  }

  logout() {
    axios.get('/logoutuser')
    .then(result => {
      if (result.data === 'logged out') {
        this.setState({user: '', login: true}, () => alert('You have been logged out'))
      }
    })
  }

  render() {
    if (this.state.user) {
      return (
      <div>
      <Nav logout={this.logout} user={this.state.user}/>
          <Redirect to='/' />
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/issues" component={Issues}/>
          <Route exact path="/book" component={Issbook}/>
          <Route exact path="/supplies" component={Issupplies}/>
          <Route exact path="/address" component={Address}/>
          <Route exact path="/group" component={Group}/>
          <Route exact path="/help" component={Help}/>
          <Route exact path="/pickgroup" component={PickGroup}/>
          <Route exact path="/deletegroup" component={DeleteGroup}/>
          <Route exact path="/activity" component={Activity}/>
          <Route exact path="/userfinances" component={UserFinances}/>
      </div>
      );
    } else if (this.state.login) {
      return (
        <div>
          {window.location.pathname !== '/login' && <Redirect to='/login' />}
          <Route exact path='/(login)' render={(props) => <Login {...props} signup={this.signup} onSubmit={this.onSubmit}/>} />
        </div>
      );
    } else {
      return (
        <div>
          {window.location.pathname !== '/signup' && <Redirect to='/signup' />}
          <Route exact path='/signup' render={(props) => <Signup {...props} onSignup={this.onSignup}/>} />
        </div>
      );
    }
  }
}

export default App;
