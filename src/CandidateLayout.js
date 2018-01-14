import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/js/materialize.js'
import '../node_modules/materialize-css/dist/css/materialize.css'
import $ from '../node_modules/jquery/dist/jquery.js'
import logo from './logo.svg';

var candidates = [
  {
    "id": 1,
    "first_name": "chirag",
    "last_name": "gupta",
    "phone": "9873772059",
    "email": "chiragguptadtu@gmail.com",
    "resume": logo,
    "application_status": "Accepted",
  },
  {
    "id": 2,
    "first_name": "chirag",
    "last_name": "gupta",
    "phone": "9873772059",
    "email": "chiragguptadtu@gmail.com",
    "resume": logo,
    "application_status": "Selected",
  },
  {
    "id": 3,
    "first_name": "chirag",
    "last_name": "gupta",
    "phone": "9873772059",
    "email": "chiragguptadtu@gmail.com",
    "resume": logo,
    "application_status": "Rejected",
  },
];


class CandidateAPI {
  static getCandidates() {
    return candidates;
  }
  static createCandidate(data) {
    var candidate = {}
    candidate.id = candidates.length + 1;
    candidate.first_name = data.first_name;
    candidate.last_name = data.last_name;
    candidate.phone = data.phone;
    candidate.email = data.email;
    candidate.application_status = data.application_status;
    candidate.resume = logo;
    candidates.push(candidate);
  }
  static updateCandidate(candidateId, data) {
    candidates.forEach(function(candidate, index) {
      if (candidate.id === candidateId) {
        candidate.name = data.name;
        candidate.first_name = data.first_name;
        candidate.last_name = data.last_name;
        candidate.phone = data.phone;
        candidate.email = data.email;
        candidate.application_status = data.application_status;
      }
    })
  }
}

class CandidateModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getInitialState() {
    if (this.props.candidate === undefined) {
      return {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        application_status: ''
      }
    }
    return this.props.candidate
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.candidate) {
      CandidateAPI.updateCandidate(this.props.candidate.id, this.state);
    } else {
      CandidateAPI.createCandidate(this.state);
    }
    this.setState(this.getInitialState());
    this.props.refreshCandidates();
  }
  componentDidMount() {
    $("#"+this.props.id).modal();
    $('select#'+this.props.id).material_select();
    $('select#'+this.props.id).on('change', this.handleChange);
  }
  render() {
    return (
      <div id={this.props.id} className="modal">
        <div className="modal-content">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input placeholder="First Name" name="first_name" value={this.state.first_name} onChange={this.handleChange} type="text" className="validate" />
            </div>
            <div className="input-field">
              <input placeholder="Last Name" name="last_name" value={this.state.last_name} onChange={this.handleChange} type="text" className="validate" />
            </div>
            <div className="input-field">
              <input placeholder="Phone" name="phone" value={this.state.phone} onChange={this.handleChange} type="tel" className="validate" />
            </div>
            <div className="input-field">
              <input placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} type="email" className="validate" />
            </div>
            <div className="input-field">
              <select id={this.props.id} name="application_status" value={this.state.application_status} onChange={this.handleChange}>
                <option value="Accepted">Accepted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="file-field input-field">
              <div className="btn blue darken-4">
                <span>Browse</span>
                <input type="file" />
              </div>
              <div className="file-path-wrapper">
                <input placeholder="Resume" className="file-path validate" type="text" />
              </div>
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

class CandidateCard extends Component {
  render() {
    const candidateModalId = "edit-candidate" + this.props.candidate.id;
    return (
      <div>
        <CandidateModal id={candidateModalId} candidate={this.props.candidate} refreshCandidates={this.props.refreshCandidates} />
        <div className="card">
          <div className="card-content">
            <label>First Name</label><p>{this.props.candidate.first_name}</p>
            <label>Last Name</label><p>{this.props.candidate.last_name}</p>
            <label>Phone</label><p>{this.props.candidate.phone}</p>
            <label>Email</label><p>{this.props.candidate.email}</p>
            <label>Application Status</label><p>{this.props.candidate.application_status}</p>
          </div>
          <div className="card-action">
            <a href={"#" + candidateModalId} className="blue-text text-darken-4 modal-trigger">Edit</a>
            <a href={this.props.candidate.resume} className="blue-text text-darken-4 modal-trigger">Resume</a>
          </div>
        </div>
      </div>
    );
  }
}

class CandidateLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {candidates: CandidateAPI.getCandidates(this.props.match.params.id)};
    this.refreshCandidates = this.refreshCandidates.bind(this);
  }
  refreshCandidates() {
    this.setState({
      candidates: CandidateAPI.getCandidates(this.props.match.params.id)
    });
  }
  render() {
    return (
      <div>
        <CandidateModal id="create-candidate" refreshCandidates={this.refreshCandidates} />
        <div className="fixed-action-btn">
          <button className="btn-floating btn-large waves-effect waves-light blue darken-4 modal-trigger" data-target="create-candidate">
            <i className="material-icons">add</i>
          </button>
        </div>
        <div className="section">
          <nav className="clean">
            <div className="col s12 nav-wrapper">
              <a href="/departments" className="breadcrumb blue-text text-darken-4">Departments</a>
              <a href={"/departments/" + this.props.match.params.id + "/vacancies"} className="breadcrumb blue-text text-darken-4">Vacancies</a>
              <a href={"/vacancies/" + this.props.match.params.id + "/candidates"} className="breadcrumb blue-text text-darken-4">Candidates</a>
            </div>
          </nav>
        </div>
        <div className="divider"></div>
        <div className="section">
          {
            this.state.candidates.map((candidate) => <CandidateCard key={candidate.id} candidate={candidate} refreshCandidates={this.refreshCandidates} />)
          }
        </div>
      </div>
    );
  }
}

export default CandidateLayout
