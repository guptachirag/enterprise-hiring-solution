import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'
import DepartmentLayout from './DepartmentLayout'
import VacancyLayout from './VacancyLayout'
import CandidateLayout from './CandidateLayout'
import AuthLayout from './AuthLayout'
import './App.css'

const Content = () => (
  <div className="container">
    <Switch>
      <Route exact path='/' component={AuthLayout}/>
      <Route exact path='/departments' component={DepartmentLayout}/>
      <Route path='/departments/:id/Vacancies' component={VacancyLayout}/>
      <Route path='/vacancies/:id/candidates' component={CandidateLayout}/>
    </Switch>
  </div>
)

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Content />
      </div>
    );
  }
}

export default App;
