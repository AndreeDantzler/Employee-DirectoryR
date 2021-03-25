import React, { Component } from "react";
import API from "../utils/API";

class ListOfEmployees extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      employees: [],
      filteredEmployees: [],
      filter: "all",
      sortDirection: "asc"
    };
  }

  // When this component mounts, search the API for employees
  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = query => {
    API.getEmployees(query)
      .then(res => { 
        console.log(res); 
          this.setState({ 
          employees: res.data.results.sort((a,b) => a.name.last.localeCompare(b.name.last)),
          filteredEmployees: res.data.results.sort((a,b) => a.name.last.localeCompare(b.name.last))
        })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    console.log(event.target.value);
    const {value} = event.target;
    let filteredEmployees;
    if (value === "all") {
      filteredEmployees = this.state.employees;
    } else {
      filteredEmployees = this.state.employees.filter(employee => employee.gender === value)
    } ;
  
    this.setState({
      filter: value,
      filteredEmployees,
    });
  };

  handleClickEvent = () => {
    let sortedNames;
    let sortDirection;
    if (this.state.sortDirection === "desc") {
      sortedNames = this.state.filteredEmployees.sort((a,b) => a.name.last.localeCompare(b.name.last));
      sortDirection = "asc"
    } else {
      sortedNames = this.state.filteredEmployees.sort((a,b) => b.name.last.localeCompare(a.name.last));
      sortDirection = "desc"
    }

    this.setState({
      filteredEmployees: sortedNames,
      sortDirection
    });
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="filter">Gender</label>
          <select id="filter" className="form-control" value={this.state.filter} onChange={this.handleInputChange}>
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <table className="table">
        <thead>
        <tr>
          <th className="clickable" onClick={this.handleClickEvent}>Name <span className={`sort-${this.state.sortDirection}`}></span></th>
          <th>Gender</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        {this.state.filteredEmployees.map(employee => {
          return (
          <tr key={employee.email}>
            <td>{employee.name.first} {employee.name.last}</td>
            <td>{employee.gender}</td>
            <td>{employee.email}</td>
          </tr>)
        })}
        </tbody>
      </table>
      </div>
    );
  }
}

export default ListOfEmployees;
