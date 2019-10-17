import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import RangeBar from './RangeBar'
import authLib from '../../config/authlib'

const fetchOption = authLib.getFetchOptions();

/**
 * valid\verification. 
 * get a value from the field and verify it is not empty\undefiend
 * @param  value  - field value 
 */
const required= (value) => {
    if (!value || value === "" || value==="select..."){
        return "this field is required"
    }
    else{
        return undefined
    }
  }


class Register extends React.Component {
    /**
     * register a new package using redux form 
     * validation  - all filed are required to be filed except the sensores!
     * the reciever must be a register user( in the system)
     * only after clicking the checkbox of the sensore,values filed will appeare.
     */
    constructor(){
        super()
        this.state = {
            registerUsers: [],
            verifyName : "user is not register",
            checkedTemp: false,
            checkedShock: false,
            validCheckBox: false,
            companies : []
        }
    }

    /**
     * when checkbox pressed change the checkbox with new status
     */
    handleCheckboxChange = event =>{
    if (event.target.name === "shock"){
        this.setState(
            { checkedShock: event.target.checked })
    }
    else{
        this.setState(
            { checkedTemp: event.target.checked })
    }
}
    /**
     * before loading the register compnent getting al regitered users and allowed compnies
     */
    componentDidMount(){
        fetch("http://localhost:8000/persons", fetchOption)
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
        fetch("http://localhost:8000/company", fetchOption)
          .then(res => res.json())
          .then(
              (data) => {
              data.forEach(elemnt => {
                  this.state.companies.push({ name: elemnt.Name, value: elemnt.Id })
              })
          })                          
            .catch(function(error){
                console.log(error)
      });   
    }

    render(){
        console.log(this.props)
        console.log(this.state.registerUsers)
        const { handleSubmit , valid } = this.props;
        /**
         * allowd email it is a function to verify that the user is a register user 
         */
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
                                name="receiverEmail"
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
                                name="Temp"
                                type="checkbox"                               
                                label="Heat Sensor"
                                onChange={this.handleCheckboxChange}
                                component={renderField} />
                                
                                { !this.state.checkedTemp ? null : <RangeBar tempVal={this.props.tempertureValues} temperatureChange={this.props.tempChange} />}

                                <Field
                                name="shock"
                                type="checkbox"
                                label="Shock sensor"
                                onChange={this.handleCheckboxChange}
                                component={renderField} />  

                                { 
                                !this.state.checkedShock ? null : 
                                    <div>
                                            <label>LIght:</label>
                                            <br />
                                            <input 
                                                name="light"
                                                type="number" 
                                                value={this.props.light} 
                                                onChange={this.props.handleChange} 
                                                min="0"
                                                max="1000"
                                                 
                                                />
                                            <br />

                                            <label>Heavy:</label>
                                            <br />
                                            <input 
                                                name="heavy"
                                                type="number" 
                                                value={this.props.heavy} 
                                                onChange={this.props.handleChange} 
                                                min="0"
                                                max="1000"
                                                />
                                            <br />

                                            <label>Severe:</label>
                                            <br />
                                            <input 
                                                name="severe"
                                                type="number" 
                                                value={this.props.severe} 
                                                onChange={this.props.handleChange} 
                                                min="0"
                                                max="1000"
                                                />
                                            <br />
                                    </div>
                                }                         
                            </div>
                        </div>
                        
                        <legend>Company</legend>

                            <div>
                                <div>
                                <select  
                                    value={this.props.chosenCompany.name}
                                    onChange={this.props.handleChange}
                                    name="chosenCompany"
                                    class="required"

                                > 
                                    <option selected="selected">select...</option>
                                    {this.state.companies.map((company) => <option key={company.name} value={company.value}>{company.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <button disabled={!valid }  type="submit" className="btn btn-fill btn-info">Submit</button>
                    </form>
                </div>
                
            </div>

        )
    }
}

export default reduxForm({
    form: 'formElements'
  })(Register);