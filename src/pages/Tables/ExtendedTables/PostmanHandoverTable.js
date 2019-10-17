import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {getFetchOptions} from '../../../config/authlib';

class PostmanHandoverTable extends Component {
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
    /*this.setState({ isLoading: true });
    fetch(global.backendURL+"packagesdetails")
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
  } */

  this.setState({ isLoading: true });   
   
    fetch("http://localhost:8000/packagesaddressdetails",getFetchOptions())
      .then(function(response){
        if (response.ok) {
            return response.json();
          } 
          else {
            throw new Error('Something went wrong ...');
          }
      })
      .then((data) => {
          console.log(data)
            data.forEach(elemnt => {
              if(elemnt.Status.toLowerCase() == "registered")
              {
                this.state.items.push(elemnt)
              }
              })
            this.setState({isLoading: false })
            console.log(this.state.items);
            console.log(this.state.items.length);

      })
      .catch(function(error){
          console.log(error)
      })
    };

  render() {
    // let { items, isShowingAlert } = this.state;
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">Receieved Packages</h4>
          <h6 className="category">Handover to Postman</h6> 
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Sender Details</th>
                <th>Pickup Adress</th>
                <th>Destination</th>
                <th>Status</th>

                <th>Action</th>
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
                      {item.OrderID}
                    </Link>
                  </td>
                  <td>{item.FullName}</td>
                  <td>{item.pickstreetaddress}</td>
                  <td>{item.dropstreetaddress}</td>
                  <td>{item.Status}</td>
                  <td className="text-middle">
                      <Link to={`/Assign/${item.OrderID}`}
                      alon={6}>
                        <div className="btn btn-info" >Assign</div>
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

export default PostmanHandoverTable;
