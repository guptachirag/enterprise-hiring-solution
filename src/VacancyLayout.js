import React, { Component } from 'react';
import Materialize from '../node_modules/materialize-css/dist/js/materialize.js'

var vacancies = [
  {
    "id": 1,
    "title": "Software Developer",
    "count": 5,
    "description": "software developer job description software developer job description",
    "requirements": "software developer job requirements software developer job requirements",
  },
  {
    "id": 2,
    "title": "Software Developer",
    "count": 5,
    "description": "software developer job description software developer job description",
    "requirements": "software developer job requirements software developer job requirements",
  },
  {
    "id": 3,
    "title": "Software Developer",
    "count": 5,
    "description": "software developer job description software developer job description",
    "requirements": "software developer job requirements software developer job requirements",
  },
];


class VacancyAPI {
  static getVacancies(departmentId) {
    return vacancies;
  }
  static createVacancy(data) {
    var vacancy = {}
    vacancy.id = vacancies.length + 1;
    vacancy.title = data.title;
    vacancy.count = data.count;
    vacancy.description = data.description;
    vacancy.requirements = data.requirements;
    vacancies.push(vacancy);
  }
  static updateVacancy(vacancyId, data) {
    vacancies.forEach(function(vacancy, index) {
      if (vacancy.id === vacancyId) {
        vacancy.title = data.title;
        vacancy.count = data.count;
        vacancy.description = data.description;
        vacancy.requirements = data.requirements;
      }
    })
  }
}

class VacancyModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getInitialState() {
    if (this.props.vacancy === undefined) {
      return {
        title: '',
        count: '',
        description: '',
        requirements: ''
      };
    }
    return this.props.vacancy
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.vacancy) {
      VacancyAPI.updateVacancy(this.props.vacancy.id, this.state);
    } else {
      VacancyAPI.createVacancy(this.state);
    }
    this.setState(this.getInitialState());
    this.props.refreshVacancies();
  }
  componentDidMount() {
    new Materialize.Modal(document.querySelector("#"+this.props.id), {});
  }
  render() {
    return (
      <div id={this.props.id} className="modal">
        <div className="modal-content">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input placeholder="Title" type="text" name="title" value={this.state.title} onChange={this.handleChange} className="validate" required />
            </div>
            <div className="input-field">
              <input placeholder="Count" type="text" name="count" value={this.state.count} onChange={this.handleChange} className="validate" />
            </div>
            <div className="">
              <textarea placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} className="materialize-textarea"></textarea>
            </div>
            <div className="input-field">
              <textarea placeholder="Requirements" name="requirements" value={this.state.requirements} onChange={this.handleChange} className="materialize-textarea"></textarea>
            </div>
            <div className="section right">
              <input type="submit" value="submit" className="modal-action modal-close blue darken-4 btn" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class VacancyCard extends Component {
  render() {
    const vacancyModalId = "edit-vacancy-" + this.props.vacancy.id;
    return (
      <div>
        <VacancyModal id={vacancyModalId} vacancy={this.props.vacancy} refreshVacancies={this.props.refreshVacancies} />
        <div className="card">
          <div className="card-content">
            <label>Title</label><p>{this.props.vacancy.title}</p>
            <label>Vacancies</label><p>{this.props.vacancy.count}</p>
            <label>Description</label><p>{this.props.vacancy.description}</p>
            <label>Requirements</label><p>{this.props.vacancy.requirements}</p>
          </div>
          <div className="card-action">
            <a href={"#" + vacancyModalId} className="blue-text text-darken-4 modal-trigger">Edit</a>
            <a href={"/vacancies/" + this.props.vacancy.id + "/candidates"} className="blue-text text-darken-4">Candidates</a>
          </div>
        </div>
      </div>
    );
  }
}

class VacanciesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {vacancies: VacancyAPI.getVacancies(this.props.match.params.id)};
    this.refreshVacancies = this.refreshVacancies.bind(this);
  }
  refreshVacancies() {
    this.setState({
      vacancies: VacancyAPI.getVacancies(this.props.match.params.id)
    });
  }
  render() {
    return (
      <div>
        <VacancyModal id="create-vacancy" refreshVacancies={this.refreshVacancies} />
        <div className="fixed-action-btn">
          <button className="btn-floating btn-large waves-effect waves-light blue darken-4 modal-trigger" data-target="create-vacancy">
            <i className="material-icons">add</i>
          </button>
        </div>
        <div className="section">
          <nav className="clean">
            <div className="col s12 nav-wrapper">
              <a href="/departments" className="breadcrumb blue-text text-darken-4">Departments</a>
              <a href={"/departments/" + this.props.match.params.id + "/vacancies"} className="breadcrumb blue-text text-darken-4">Vacancies</a>
            </div>
          </nav>
        </div>
        <div className="divider"></div>
        <div className="section">
          {
            this.state.vacancies.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} refreshVacancies={this.refreshVacancies} />)
          }
        </div>
      </div>
    );
  }
}

export default VacanciesLayout
