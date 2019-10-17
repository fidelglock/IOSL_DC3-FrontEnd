import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import authLib from "../../../config/authlib";

class TableWithLinks extends Component {
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
    const options = authLib.getFetchOptions();
    fetch("http://localhost:8000/orderHistory", options)
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
          <h4 className="title">Company Assigned Packages</h4>
          {/* <p className="category">Here is a subtitle for this table</p> */}
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Postman ID</th>
                <th>Pickup Adress</th>
                <th>Pickup Date</th>
                <th>Destination</th>
                <th>Status</th>

                <th className="text-middle">Action</th>
                <th className="text-middle">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <tr key={item.OrderID}>
                  <td>{item.OrderID}</td>
                  <td>{item.PostmanId}</td>
                  <td>{item.PickAddressID}</td>
                  <td>{item.PickDate}</td>
                  <td>{item.DropAddressID}</td>
                  <td>{item.Status}</td>
                  <td className="text-middle">
                    <Link to={`/assign/${item.OrderID}`}>
                      <div className="btn btn-wd btn-info">Handover</div>
                    </Link>
                  </td>
                  <td className="text-middle">
                    <Link to={`/postman/delivery/${item.OrderID}`}>
                      <div className="btn btn-wd btn-info">Deliver</div>
                    </Link>
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

export default TableWithLinks;
