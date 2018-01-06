import React, { Component } from 'react';
import Materialize from '../node_modules/materialize-css/dist/js/materialize.js'
import '../node_modules/materialize-css/dist/css/materialize.css'
import logo from './logo.svg';


var departments = [
  {
    "id": 1,
    "image": logo,
    "name": "Tech"
  },
  {
    "id": 2,
    "image": logo,
    "name": "Finance"
  },
  {
    "id": 3,
    "image": logo,
    "name": "HR"
  },
  {
    "id": 4,
    "image": logo,
    "name": "Management"
  },
  {
    "id": 5,
    "image": logo,
    "name": "Marketing"
  },
];

class DepartmentAPI {
  static getDepartments() {
    return departments
  }
  static createDepartment(data) {
    var department = {}
    department.id = departments.length + 1;
    department.image = logo;
    department.name = data.name;
    departments.push(department);
  }
  static updateDepartment(departmentId, data) {
    departments.forEach(function(department, index) {
      if (department.id === departmentId) {
        department.name = data.name;
      }
    })
  }
}

class DepartmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getInitialState() {
    var state = {name: ''};
    if (this.props.department) {
        state.name = this.props.department.name;
    }
    return state
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name
    };
    if (this.props.department) {
      DepartmentAPI.updateDepartment(this.props.department.id, data);
    } else {
      DepartmentAPI.createDepartment(data);
    }
    this.setState(this.getInitialState());
    this.props.refreshDepartments();
  }
  componentDidMount() {
    new Materialize.Modal(document.querySelector("#"+this.props.id), {});
    Materialize.updateTextFields();
  }
  render() {
    return (
      <div id={this.props.id} className="modal">
         <div className="modal-content">
           <form onSubmit={this.handleSubmit}>
             <div className="input-field">
               <input placeholder="Department Name" name="name" type="text" value={this.state.name} onChange={this.handleChange} className="validate" />
             </div>
             <div className="file-field input-field">
               <div className="btn blue darken-4">
                 <span>Browse</span>
                 <input type="file" ref={input => {this.fileInput = input;}} />
               </div>
               <div className="file-path-wrapper">
                 <input  placeholder="Department Image" className="file-path validate" type="text" />
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

class DepartmentCard extends Component {
  render() {
    const departmentModalId = "edit-department-" + this.props.department.id;
    return (
      <div>
        <DepartmentModal id={departmentModalId} department={this.props.department} refreshDepartments={this.props.refreshDepartments} />
        <div className="card center">
          <div className="card-image">
            <img src={this.props.department.image} alt="Team" />
          </div>
          <div className="card-content">
            <span className="card-title">{this.props.department.name}</span>
          </div>
          <div className="card-action">
            <a href={"#" + departmentModalId} className="blue-text text-darken-4 modal-trigger">Edit</a>
            <a href={'/departments/' + this.props.department.id + '/vacancies'} className="blue-text text-darken-4">Vacancies</a>
          </div>
        </div>
      </div>
    );
  }
}

class DepartmentLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {departments: DepartmentAPI.getDepartments()};
    this.refreshDepartments = this.refreshDepartments.bind(this);
  }
  refreshDepartments() {
    this.setState({
      'departments': DepartmentAPI.getDepartments()
    });
  }
  render() {
    return (
      <div>
        <DepartmentModal id="create-department" refreshDepartments={this.refreshDepartments} />
        <div className="section">
          <nav className="clean">
            <div className="col s12 nav-wrapper">
              <a href="/departments" className="breadcrumb blue-text text-darken-4">Departments</a>
            </div>
          </nav>
        </div>
        <div className="divider"></div>
        <div className="section">
          <div className="row">
            {
              this.state.departments.map((department) => (
                <div key={department.id} className="col s6 m4 l3">
                  <DepartmentCard department={department} refreshDepartments={this.refreshDepartments} />
                </div>
              ))
            }
          </div>
        </div>
        <div className="fixed-action-btn">
          <button className="btn-floating btn-large waves-effect waves-light blue darken-4 modal-trigger" data-target="create-department">
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
    );
  }
}

export default DepartmentLayout
