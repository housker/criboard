//this is vestigial and is only here for debugging if any unforeseen issues arise in the future

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import axios from 'axios';

import Nav from '../components/Nav.jsx';
import App from '../components/App.jsx';
import Landing from '../components/Landing.jsx';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
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

import Logout from '../components/Logout.jsx';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      login: true,
      signup: false,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <Switch>
          <Route path='/' render={(props) => <App {...props} user={this.state.user} onSubmit={this.onSubmit}/>} />
        </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter;