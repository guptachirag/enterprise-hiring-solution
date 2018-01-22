import React, { Component } from 'react';
import $ from '../node_modules/jquery/dist/jquery.js'

class ProfileDropdown extends Component {
  initializeDropdown() {
    $('.dropdown-button').dropdown({
      hover: true,
      belowOrigin: true,
      alignment: 'right',
    });
  }

  componentDidMount() {
    this.initializeDropdown();
  }

  componentDidUpdate() {
    this.initializeDropdown();
  }

  render() {
    if (this.props.profile.id) {
      return (
        <div>
          <a className='dropdown-button right margin-right' href='#!' data-activates='profile-dropdown'>
            <img src={this.props.profile.profile} alt="profile" className="profile circle" />
          </a>
          <ul id='profile-dropdown' className='dropdown-content'>
            <li><a href="/profile">Profile</a></li>
            <li className="divider"></li>
            <li><a href="/signout">Signout</a></li>
          </ul>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}


class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo margin-left">Enterprise Hiring Solution</a>
            <ProfileDropdown profile={this.props.profile} />
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar
