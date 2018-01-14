import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/js/materialize.js'
import '../node_modules/materialize-css/dist/css/materialize.css'
import $ from '../node_modules/jquery/dist/jquery.js'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      username: '',
      password: '',
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} type="text" className="validate" />
          </div>
          <div className="input-field">
            <input placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} type="password" className="validate" />
          </div>
          <div className="section center">
            <input type="submit" value="submit" className="modal-action modal-close blue darken-4 btn" />
          </div>
        </form>
      </div>
    );
  }
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      name: '',
      phone: '',
      email: '',
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} type="text" className="validate" />
            </div>
            <div className="input-field">
              <input placeholder="Phone" name="phone" value={this.state.phone} onChange={this.handleChange} type="tel" className="validate" />
            </div>
            <div className="input-field">
              <input placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} type="email" className="validate" />
            </div>
            <div className="file-field input-field">
              <div className="btn blue darken-4">
                <span>Browse</span>
                <input type="file" />
              </div>
              <div className="file-path-wrapper">
                <input placeholder="Profile Pic" className="file-path validate" type="text" />
              </div>
            </div>
            <div className="section center">
              <input type="submit" value="submit" className="modal-action modal-close blue darken-4 btn" />
            </div>
          </form>
      </div>
    );
  }
}


class AuthLayout extends Component {
  render() {
    return (
      <div>
        <div className="auth">
          <ul className="tabs tabs-fixed-width z-depth-1">
            <li className="tab col s3"><a className="active blue-text text-darken-4" href="#test2">Login</a></li>
            <li className="tab col s3"><a className="blue-text text-darken-4" href="#test1">Register</a></li>
            <div className="indicator blue darken-4"></div>
          </ul>
          <div id="test1" className="section card-panel">
            <Register />
          </div>
          <div id="test2" className="section card-panel">
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default AuthLayout;
