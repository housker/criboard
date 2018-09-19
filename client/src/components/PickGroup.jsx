import React from 'react';
import axios from 'axios';
import AddTransaction from './AddTransaction.jsx';
import Nav from './Nav.jsx';

class PickGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      group: '',
      showTransaction: false
    };
  }

  componentDidMount() {
    // get groups for logged in user
    axios.get('/groups')
    .then(result => {
      this.setState({
        groups: result.data,
        group: result.data[0]
      });
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit() {
    console.log('in on submit', this.state.group)
    this.setState({
      showTransaction: !this.state.showTransaction
    })
  }

  render() {
    let optionItems = this.state.groups.map((group, i) => {
      return (
        <option key={i}>
          {group}
        </option>
      );
    });
    return (
      <div className="transaction-container">
        <div className="inner-transaction">
          <div className="form-group pick-group">
            {!this.state.showTransaction && <div>
              <label className="display-4">Pick a Group</label>&nbsp;&nbsp;
              <select className="transaction-form form-control" name="group" value={this.state.group} onChange={this.onChange.bind(this)} >
                {optionItems}
              </select>
            </div>}
            {this.state.showTransaction ?
            <button className="btn pick-button" onClick={this.onSubmit.bind(this)}>
              <svg className="svg-icon back-icon" viewBox="0 0 20 20">
                <path d="M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z"></path>
              </svg>
            </button>
            : <button className="btn pick-button" onClick={this.onSubmit.bind(this)}>Submit</button>}
            {this.state.showTransaction && <AddTransaction className="add-transaction" group={this.state.group} />}
          </div>
        </div>
      </div>
    );
  }
}

export default PickGroup;