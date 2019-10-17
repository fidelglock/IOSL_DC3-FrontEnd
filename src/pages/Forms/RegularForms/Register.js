import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';

const required= (value) => {
    if (!value || value === ""){
        return "this field is required"
    }
    else{
        return undefined
    }
  }

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            registerUsers: [],
            verifyName : "user is not register"
        }
        // this.verify = this.verify.bind(this)
        // this.allowedEmail = this.allowedEmail.bind(this)

    }

    componentDidMount(){
    fetch("http://localhost:8000/persons")
        .then(function(response){
        if (response.ok) {
            return response.json();
            } 
            else {
            throw new Error('NO receiverEmail');
            }
        })
        .then((data) => {
            data.forEach(elemnt => {
                this.state.registerUsers.push(elemnt.Email)
            })                          
        })
        .catch(function(error){
            console.log(error)
        })    
    }

    // verify(value){
    //     console.log(value)
    //     console.log("verify")
    //     fetch("http://localhost:8000/persons/exists/" + value)
    //     .then(function(response){
    //     if (response.ok) {
    //         return response.json();
    //         } 
    //         else {
    //         throw new Error('NO receiverEmail');
    //         }
    //     })
    //     .then((data) => {
    //         console.log(data)
    //         if (data === undefined || data.length === 0) {
    //             console.log("false")
    //             // this.setState({verifyName :"user is not register"})
    //             this.setState({verifyName :false})
    //         }
    //         else{
    //             console.log("ture, return nudefined")
    //             // this.setState({verifyName :undefined})
    //             this.setState({verifyName :true})   
    //         }                 
    //     })

    //     // return this.state.verifyName
    // }

    // allowedEmail(value){
    //     if (!this.state.verifyName){
    //         return "user is not register"
    //     }
    //     else{
    //         return undefined
    //     }
    // }

    render(){
        console.log("!!! rendering again!!!")
        console.log(this.props)
        console.log(this.state.registerUsers)
        const { handleSubmit , valid } = this.props;
        const allowedEmail= (value) => {
            if (this.state.registerUsers.indexOf(value) === -1){
                return "user is not register"
            }
            else{
                console.log("*******" + this.state.registerUsers)
                return undefined
            }
          }
        
        
        return(
            <div className="card">
                <div className="header">
                    <h4>Register New Package</h4>
                </div>
                <div className="content">
                    <form onSubmit={handleSubmit} className="form-horizontal">

                        <legend>Pickup Address</legend>

                        <div className="form-group">
                        <label className="control-label col-md-3">Name</label>
                        <div className="col-md-9">
                            <Field
                            name="Sender Name"
                            placeholder = "Joh Doe"
                            type="text"
                            component={renderField}
                            validate = {required} 
                            helpText="as appear on your Mailbox" /> 
                        </div>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-md-3">country</label>
                        <div className="col-md-9">
                            <Field
                            name="country"
                            type="text"
                            placeholder = "Germany"
                            validate = {required} 
                            component={renderField} />
                            {/* helpText="A block of help text that breaks onto a new line." /> */}
                        </div>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-md-3">City</label>
                        <div className="col-md-9">
                            <Field
                            name="city"
                            placeholder = "Berlin"
                            type="text"
                            validate = {required} 
                            component={renderField} />
                        </div>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-md-3">Street</label>
                        <div className="col-md-9">
                            <Field
                            name="street"
                            placeholder = "berlinstr.88"
                            type="text"
                            validate = {required} 
                            component={renderField} />
                        </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">zip</label>
                            <div className="col-md-9">
                                <Field
                                name="zip"
                                placeholder = "10235"
                                type="text"
                                validate = {required} 
                                component={renderField} />
                            </div>
                        </div>


                        <legend>Destination Address</legend>

                        <div className="form-group">
                            <label className="control-label col-md-3">receiver email</label>
                            <div className="col-md-9">
                                <Field
                                name="postmanEmail"
                                placeholder = "Joh Doe"
                                type="text"
                                component={renderField}
                                onCj
                                validate = {[required, allowedEmail]} 
                                helpText="as appear on reciever Mailbox" />
                                
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">country</label>
                            <div className="col-md-9">
                                <Field
                                name="dcountry"
                                type="text"
                                validate = {required} 
                                placeholder = "Germany"
                                component={renderField} />
                                {/* helpText="A block of help text that breaks onto a new line." /> */}
                            </div>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-md-3">City</label>
                        <div className="col-md-9">
                            <Field
                            name="dcity"
                            placeholder = "Berlin"
                            type="text"
                            validate = {required} 
                            component={renderField} />
                        </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">street</label>
                            <div className="col-md-9">
                                <Field
                                name="dstreet"
                                placeholder = "berlinstr.88"
                                type="text"
                                validate = {required} 
                                component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">zip</label>
                            <div className="col-md-9">
                                <Field
                                name="dzip"
                                placeholder = "10235"
                                type="text"
                                validate = {required} 
                                component={renderField} />
                            </div>
                        </div>

                        <legend>Sensors</legend>

                        <div className="form-group">
                            <label className="control-label col-md-3">Sensors</label>
                            <div className="col-md-9 checkbox-group">
                                <Field
                                name="checkbox1"
                                type="checkbox"                               
                                label="Heat Sensor"
                                component={renderField} />

                                <Field
                                name="checkbox2"
                                type="checkbox"
                                label="Pressure Sensors"
                                component={renderField} />                           
                            </div>
                        </div>
                        <button disabled={!valid}  type="submit" className="btn btn-fill btn-info">Submit</button>
                    </form>
                </div>
            </div>

        )
    }
}
// disabled={this.state.validate}
export default reduxForm({
    form: 'formElements'
  })(Register);