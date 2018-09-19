import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import axios from 'axios';
import '../assets/styles/index.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
      user: ''
    }
  }

  componentDidMount() {
    this.setState({user: this.props.user})
  }

  hideDashboard() {
    this.setState({dashboard: false, user: this.props.user});
  }

  showDashboard() {
    this.setState({dashboard: true, user: this.props.user});
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
              <Link to="/">
                <div className="nav-link" href="#" onClick={this.showDashboard}>Dashboard <span className="sr-only">(current)</span></div>
              </Link>
              </li>
              <li className="nav-item">
              <Link to="/userfinances">
                <div className="nav-link" href="#" onClick={this.hideDashboard}>Finances</div>
              </Link>
              </li>
              <li className="nav-item">
                <Link to="/activity">
                <div className="nav-link" href="#" onClick={this.hideDashboard}>All Activity</div>
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/pickgroup">
                <div className="nav-link" href="#" onClick={this.hideDashboard}>Add Transaction</div>
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/issues">
                <div className="nav-link" href="#" onClick={this.hideDashboard}>Issues</div>
                </Link>
              </li>
            </ul>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <li className="nav-item dropdown">
            <div className="navbar-brand nav-link dropdown-toggle display-3" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.user.toUpperCase()} </div>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/address">
                <div className="dropdown-item" href="#">Enter Address</div>
              </Link>
              <Link to="/group">
                <div className="dropdown-item" href="#" onClick={this.hideDashboard}>Create Group</div>
              </Link>
              <Link to="/deletegroup">
                <div className="dropdown-item" href="#" onClick={this.hideDashboard}>Delete Group</div>
              </Link>
              <Link to="/help">
                <div className="dropdown-item" href="#" onClick={this.hideDashboard}>Help</div>
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/logout">
              <div className="dropdown-item" href="#" onClick={this.props.logout}>Logout</div>
              </Link>
            </div>
          </li>
        </nav>
      </div>
    );
  }
}

export default Home;