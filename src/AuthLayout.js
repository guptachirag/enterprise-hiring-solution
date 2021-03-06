import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/js/materialize.js'
import '../node_modules/materialize-css/dist/css/materialize.css'
import $ from '../node_modules/jquery/dist/jquery.js'
import logo from './logo.svg';
import { Redirect } from 'react-router-dom'

var users = [
  {
    'id': 1,
    'username': 'chirag-gupta-1',
    'password': 'password1',
    'name': 'chirag gupta1',
    'phone': '9873772059',
    'profile_pic': logo,
    'email': 'chiragguptadtu+1@gmail.com',
  },
  {
    'id': 2,
    'username': 'chirag-gupta-2',
    'password': 'password2',
    'name': 'chirag gupta2',
    'phone': '9873772019',
    'profile_pic': logo,
    'email': 'chiragguptadtu+2@gmail.com',
  },
];

class UserAPI {
  static createUser(data) {
    data['id'] = users.length + 1;
    data['profile'] = 'logo';
    users.push(data);
  }
  static updateUser(id, data) {
    users.forEach(function(user, index) {
      if (user.id === id) {
        Object.keys(data).forEach(function(key) {
          user[key] = data[key];
        });
      }
    });
  }
  static getUser(username, password) {
    var matched = {};
    users.forEach(function(user, index) {
      if (user.username === username && user.password === password) {
        matched = user;
      }
    });
    return matched;
  }
}

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
    var user = UserAPI.getUser(this.state.username, this.state.password);
    this.props.setProfile(user);
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
    this.state = this.props.profile || {
      name: '',
      username: '',
      password: '',
      phone: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var profile = this.props.profile || {};
    if (profile.id === undefined) {
      UserAPI.createUser(this.state);
    } else {
      UserAPI.updateUser(profile.id, this.state);
      this.props.editProfileRedirect()
    }
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

export class ProfileLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'editProfileRedirect': false
    }
    this.editProfileRedirect = this.editProfileRedirect.bind(this);
  }

  editProfileRedirect() {
    this.setState({
      'editProfileRedirect': true
    });
  }

  render() {
    if (this.state.editProfileRedirect === true) {
      return (
        <Redirect to="/" />
      );
    } else {
      return (
        <div>
          <div className="section">
            <h5 className="center">Edit Profile</h5>
          </div>
          <div className="divider"></div>
          <div className="section">
            <Register profile={this.props.profile} editProfileRedirect={this.editProfileRedirect} />
          </div>
        </div>
      );
    }
  }
}


class AuthLayout extends Component {

  componentDidMount() {
    $('ul.tabs').tabs();
  }

  render() {
    return (
      <div>
        <div className="auth">
          <ul className="tabs tabs-fixed-width z-depth-1">
            <li className="tab col s3"><a className="active" href="#test2">Login</a></li>
            <li className="tab col s3"><a href="#test1">Register</a></li>
          </ul>
          <div id="test1" className="section card-panel">
            <Register setProfile={this.props.setProfile} />
          </div>
          <div id="test2" className="section card-panel">
            <Login setProfile={this.props.setProfile} />
          </div>
        </div>
      </div>
    );
  }
}

export default AuthLayout;
