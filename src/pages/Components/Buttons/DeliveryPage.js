import React from "react";
import { Field, reduxForm } from "redux-form";
import authLib from "../../../config/authlib";
import { Alert } from "react-bootstrap";

class DeliveryPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: false,
      thePackage: {},
      items: [],
      deliveryData: props.match.params.dropaddressid,
      StatusChange: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    values.preventDefault();

    const fetchOption = authLib.getFetchOptions();
    const userObj = authLib.getUserObj();

    //TODO: Use global.backendURL
    fetch("http://localhost:8000/package/" + this.state.deliveryData, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": fetchOption.headers["x-access-token"]
      },
      body: JSON.stringify({
        Status: "Delievered"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ StatusChange: true });
      });

    fetch("http://localhost:8000/OrderHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": fetchOption.headers["x-access-token"]
      },
      body: JSON.stringify({
        orderId: this.state.deliveryData,
        handoverDate: new Date(),
        status: "Delievered",
        postmanId: userObj.ID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  render() {
    return (
      <div className="card">
        <div className="header">
          <h4>Deliver Package</h4>
        </div>
        <h4 className="text-center">
          Drop Location ID:{this.state.deliveryData}
        </h4>
        <div className="content">
          <form onSubmit={this.handleSubmit} className="form-horizontal">
            <legend>The package is being delivered here</legend>
            <div className="row">
              <button type="submit" className="btn btn-fill btn-info">
                Confirm
              </button>
            </div>
          </form>
          <div className="row">
            <Alert
              variant="danger"
              className={this.state.StatusChange ? "visible" : "hidden"}
            >
              Package delivery was successfully Confirmed ! Thank you !
            </Alert>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "formElements"
})(DeliveryPage);
