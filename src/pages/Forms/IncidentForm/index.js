import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import _ from 'lodash';
import authLib from '../../../config/authlib'
import { Alert } from "react-bootstrap";

const fetchOption = authLib.getFetchOptions();

const required = (value) => {
  if (!value || value === "") {
    return "this field is required"
  }
  else {
    return undefined
  }
}

class IncidentForm extends React.Component {
  /**
   * register a new incident using redux form 
   * validation  - all fields are required to be filled!
   * the reciever must be a register user( in the system)
   */
  constructor() {
    super()
    this.state = {
      IncidentSuccess: false
    }
    // this.submit = this.submit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(values) {
    values.preventDefault(); 
  

    console.log(values)
    const options = authLib.getUserObj();
    console.log(options)
    const userID = options.ID
    console.log(userID)

    fetch("http://localhost:8000/incidents", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': fetchOption.headers['x-access-token']
      },
      body: JSON.stringify({
        "Description": values.target[0].value,
        "OrderId": values.target[1].value,
        "PersonId": userID,
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ IncidentSuccess: true });
      })
  }


  render() {


    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header"><h4>Create Incident</h4></div>
            <form className="form-horizontal" onSubmit={ this.handleSubmit}>
              <div className="content">
                <div className="form-group">
                  <label className="col-sm-3 control-label">Issue Description</label>
                  <div className="col-sm-9">
                    <Field
                      type="text"
                      name="Description"
                      validate={required}
                      component={renderField} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">Order ID</label>
                  <div className="col-sm-9">
                    <Field
                      type="number"
                      name="OrderId"
                      validate={required}
                      component={renderField} />
                  </div>
                </div>

              </div>
              <div className="footer text-center">
                <button type="submit" className="btn btn-info btn-fill">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <Alert variant="danger" className={this.state.IncidentSuccess ? 'visible' : 'hidden'}>
          Incident was successfully Raised ! Thank you !
          </Alert>
      </div>
    );
  }
}

export default reduxForm({
  form: 'IncidentForm',
  required
})(IncidentForm);