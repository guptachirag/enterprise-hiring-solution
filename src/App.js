import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import DepartmentLayout from './DepartmentLayout'
import VacancyLayout from './VacancyLayout'
import CandidateLayout from './CandidateLayout'
import AuthLayout, {ProfileLayout} from './AuthLayout'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

class Content extends Component {
  render() {
    if (this.props.profile.id) {
      return  (
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route exact path='/departments' component={DepartmentLayout} />
              <Route exact path='/profile' render={
                ()=> <ProfileLayout profile={this.props.profile} setProfile={this.props.setProfile} />
                } />
              <Route path='/departments/:id/Vacancies' component={VacancyLayout} />
              <Route path='/vacancies/:id/candidates' component={CandidateLayout} />
              <Route exact path='*' render={() => <Redirect to='/departments' />} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <AuthLayout setProfile={this.props.setProfile} />
      );
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(sessionStorage.getItem('user')) || '{}';
    this.setProfile = this.setProfile.bind(this);
  }

  setProfile(user) {
    this.setState(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  render() {
    return (
      <div>
        <Navbar profile={this.state} setProfile={this.setProfile} />
        <Content profile={this.state} setProfile={this.setProfile} />
      </div>
    );
  }
}

export default App;
