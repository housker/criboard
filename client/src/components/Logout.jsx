import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onLandingPage: false
    }
  }

  componentDidMount() {
    axios.get('/logoutuser')
      .then(result => {
        console.log(result)
        if (result.data === 'logged out') {
          alert('You have been logged out');
          this.setState({
            onLandingPage: true
          })
        }
      })
  }

  render() {
    return(
      <div>
      <h3>Logout</h3>
        <ul>
          <li>Logging out...</li>
        </ul>
      </div>
    )
  }
}

export default Logout;

    // if (this.state.onLandingPage) {
    //   return (
    //     <Redirect to='/' />
    //   );
    // }



    //THIS COMPONENET CAN BE DELETED