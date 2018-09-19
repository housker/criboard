import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './Nav.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 42.09,
      longitude: -72.58,
      address: '123 Main St; Springfield, MA 01105',
      street: '',
      city: '',
      user: ''
    };
  }

  componentDidMount() {
    axios.get('/getaddress')
    .then(result => {
      this.setState({
      user: result.data.username,
      address: result.data.address,
      street: result.data.address.split(';')[0],
      city: result.data.address.split(';')[1],
      latitude: result.data.latitude,
      longitude: result.data.longitude
      }, () => {
        var mymap = L.map('mapid').setView([this.state.latitude, this.state.longitude], 15);
        var marker = L.marker([this.state.latitude, this.state.longitude]).addTo(mymap);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaG91c2tlciIsImEiOiJjamh2aXMwODcwem5uM2twMzA3cmZsbnBvIn0.rz3s-qyoAcFzzrOd91YdYg'
        }).addTo(mymap);
      });
    var mymap = L.map('mapid').setView([this.state.latitude, this.state.longitude], 15);
    var marker = L.marker([this.state.latitude, this.state.longitude]).addTo(mymap);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaG91c2tlciIsImEiOiJjamh2aXMwODcwem5uM2twMzA3cmZsbnBvIn0.rz3s-qyoAcFzzrOd91YdYg'
    }).addTo(mymap);
      var mymap = L.map('mapid').setView([this.state.latitude, this.state.longitude], 15);
      var marker = L.marker([this.state.latitude, this.state.longitude]).addTo(mymap);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaG91c2tlciIsImEiOiJjamh2aXMwODcwem5uM2twMzA3cmZsbnBvIn0.rz3s-qyoAcFzzrOd91YdYg'
        }).addTo(mymap);
    });
  }

  render() {
    var cardStyle = {'boxSizing': 'border-box', 'width': '80vw', 'height': '80vh', 'zIndex': '9', 'backgroundColor': 'rgba(252, 150, 15, 0.4)', 'margin': '0 auto', 'top': '3vh'}
    var mapStyle = {'height': '70%', 'zIndex': '10', 'margin': '3vh'}
    return(
      <div className="dashboard-container">
        <div className="card" style={cardStyle}>
          <div id="mapid" style={mapStyle}></div>
        <div className="card-body">
          <h5 className="card-title display-4">{this.state.street}</h5>
          <h5 className="card-title display-4">{this.state.city}</h5>
        </div>
      </div>
      <div className="plant"></div>
      </div>
    )
  }
}

export default Dashboard;