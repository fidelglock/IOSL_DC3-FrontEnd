import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import authLib from '../../../config/authlib'

class TableWithLinksIncidents extends Component {
  constructor() {
    super();
    this.state = {
      packages: {},
      Incidents: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const options = authLib.getFetchOptions();
    fetch("http://localhost:8000/incidents", options)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => {
        console.log(data);
        data.forEach(elemnt => {
          this.state.Incidents.push(elemnt);
        });
        this.setState({ isLoading: false });
        console.log(this.state.Incidents);
        console.log(this.state.Incidents.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //TODO: Update the state in the database as well
  deleteItem = id => {
    this.setState({
      Incidents: this.state.Incidents.filter(Incident => Incident.IncidentId !== id)
    });
  };

  render() {
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">Incidents Raised</h4>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Order ID</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Incidents.map(Incident => (
                <tr key={Incident.PersonID}>
                  <td>{Incident.IncidentId}</td>
                  <td>{Incident.OrderId}</td>
                  <td>{Incident.Description}</td>
                  <td className="text-middle">
                    <div className="btn btn-wd btn-info">
                      <a rel="tooltip" className="btn btn-wd btn-info btn btn-info btn-simple btn-xs"
                        onClick={() => this.deleteItem(Incident.IncidentId)}>Resolve Incident
                      </a>
                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableWithLinksIncidents;
