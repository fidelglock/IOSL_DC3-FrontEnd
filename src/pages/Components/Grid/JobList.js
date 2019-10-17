import React, { Component } from "react";
import authLib from '../../../config/authlib'
import { Link } from "react-router-dom";

class JobList extends Component {
  constructor() {
    super();
    this.state = {
      package: {},
      items: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const options = authLib.getFetchOptions()  ;
    fetch("http://localhost:8000/packagesdetails",options)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => {
        console.log(data);
        data.forEach(elemnt => {
          this.state.items.push(elemnt);
        });
        this.setState({ isLoading: false });
        console.log(this.state.items);
        console.log(this.state.items.length);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    });
  };

  render() {
    // let { items, isShowingAlert } = this.state;
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">Accept Handover Packages</h4>
          {/* <p className="category">Here is a subtitle for this table</p> */}
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Releasing Postman</th>
                <th>Releasing Company</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <tr key={item.OrderID}>
                  <td>
                    <Link
                      to={`/package/${item.OrderID}`}
                      style={{ color: "blue" }}
                    >
                      {/* <i className="pe-7s-graph"></i> */}
                      {item.OrderID}
                    </Link>
                  </td>
                  <td>{item.StreetAddress}</td>
                  <td>{item.PostCode}</td>
                  <td>{item.City}</td>

                  
                    
                   
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default JobList;
