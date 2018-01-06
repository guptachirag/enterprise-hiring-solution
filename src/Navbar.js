import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
        <div className="navbar-fixed">
          <nav className="blue darken-4">
            <div className="nav-wrapper">
              <h5><a className="logo">Enterprise Hiring Solution</a></h5>
            </div>
          </nav>
        </div>
    );
  }
}

export default Navbar
