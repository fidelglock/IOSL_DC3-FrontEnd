import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
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

class UpgradeUser extends React.Component {
  constructor() {
    super()
    this.state = {
      UpgradeFailure: false,
      UpgradeSuccess: false,
      IsEmailExists: false
    }
    // this.submit = this.submit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }


 
  handleSubmit(values) {
      
    values.preventDefault(); 
    console.log(values)

      fetch('http://localhost:8000/persons/userTypeByEmail', {
        method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': fetchOption.headers['x-access-token']
      },
      body: JSON.stringify({
        "email": values.target[0].value,
        "persontype": values.target["Radio"].value
      })
    })
      .then(res => res.json())
      .then(data => { 
        if (data && data.success == true) {
        this.setState({ UpgradeSuccess: true });
        this.setState({ UpgradeFailure: false });
        }
        else
        {
        this.setState({ UpgradeSuccess: false });
        this.setState({ UpgradeFailure: true });
        }
      })
    }
  

    render() {

    return (<div className="card">
      <div className="header">
        <h4>Upgrade Users</h4>
      </div>
      <div className="content">
        <form onSubmit= {this.handleSubmit} >

          <div className="form-group">
            <label className="control-label">Email</label>
            <Field 
            name="email" 
            type="email" 
            validate={required}
            component={renderField} />
          </div>


          <div className="radio-group">
            <Field
              name="Radio"
              type="radio"
              label="Upgrade to Postman User"
              value="3"
              component={renderField} />

            <Field
              name="Radio"
              type="radio"
              label="Upgrade to Company User"
              value="2"
              component={renderField} />

          </div>

          <button type="submit" className="btn btn-fill btn-info">Upgrade</button>
        </form>
      </div>
      <Alert variant="danger" className={this.state.UpgradeSuccess ? 'visible' : 'hidden'}>
          Upgrade was successful ! Thank you !
          </Alert>
      <Alert variant="danger" className={this.state.UpgradeFailure ? 'visible' : 'hidden'}>
          User doesn't exist in the system !
          </Alert>
    </div>);
  };
}

export default reduxForm({
  form: 'UpgradeUser'
})(UpgradeUser)