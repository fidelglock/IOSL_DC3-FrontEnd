import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';

class RegisterUser extends React.Component {
    constructor(){
        super()
        this.state = {
          Persons : {},
          
        }
      }
    
        

    render(){
        const { handleSubmit } = this.props;
        return(
            <div className="card">
                <div className="header">
                    <h4>Register Profile</h4>
                </div>
                <div className="content">
                    <form onSubmit={handleSubmit} className="form-horizontal">

                        <legend>Personal Details</legend>

                        <div className="form-group">
                        <label className="control-label col-md-3">Full Name</label>
                        <div className="col-md-9">
                            <Field
                            name="Full Name"
                            placeholder = "Jason Statham"
                            type="text"
                            component={renderField} 
                             /> 
                        </div>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-md-3">Email ID</label>
                        <div className="col-md-9">
                            <Field
                            name="Email ID"
                            placeholder = "abc@xyz.com"
                            type="text"
                            component={renderField} 
                             /> 
                        </div>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-md-3">Password</label>
                        <div className="col-md-9">
                            <Field
                            name="Password"
                            type="text"
                            placeholder = "**********"
                            component={renderField} 
                            helpText="Provide a Strong Password with Upper/Lower case and Special Characters" /> 
                        </div>
                        </div>

                        

                        <legend>Type of Customer</legend>

                        <div className="form-group">
                            <label className="col-sm-12">Customer Type</label>
                            
                        <form>
                            <div className="radio">
                                <label>
                                <input type="radio" value="1" checked={true} />
                                User
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                <input type="radio" value="2" />
                                Company - User
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                <input type="radio" value="3" />
                                Postman
                                </label>
                            </div>
                        </form>
                        </div>
                        <button type="submit" className="btn btn-fill btn-info">Submit</button>
                    </form>
                </div>
            </div>

        )
    }
}

export default reduxForm({
    form: 'formElements'
  })(RegisterUser);