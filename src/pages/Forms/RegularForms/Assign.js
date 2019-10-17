import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import authLib from '../../../config/authlib'
class Assign extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            registerPostmen: [],
            registerPostmenObj: [],

            thePackage: {},
            items: [],
            orderid: props.match.params.orderid,
            characters: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.options = authLib.getFetchOptions();
    }

    getPostmenId(email) {
        var postman = this.state.registerPostmenObj.filter((postman) => {
            if (postman.Email.toLowerCase() == email.toLowerCase()) return true;

        });
        return postman[0].ID;
    }

    handleSubmit(event) {
        event.preventDefault();

        //verify if it is a valid postman email address
        if (event.target.length > 0 &&
            this.state.registerPostmen.indexOf(event.target[0].value) === -1) {
            alert('Please provide correct email address');
            return;
        }
    
        var todayDate = authLib.getTodayDate();
        var email = event.target[0].value;
        var postmanid = this.getPostmenId(email);


        //set the state to loading of the view
        this.setState({ loading: true });

        fetch("http://localhost:8000/OrderHistory", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.options.headers['x-access-token']
            },
            body: JSON.stringify({
                "orderId": this.state.orderid,
                "handoverDate": todayDate,
                "status": "In-Transit",
                "postmanId": postmanid
            })
        })
            .then(res => res.json())
            .then(
                (data) => {
                    alert('Package has been assigned');
                    console.log(data);
                    //TODO: redirect to home page
                });

        fetch("http://localhost:8000/package/" + this.state.orderid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.options.headers['x-access-token']
            },
            body: JSON.stringify({
                "orderId": this.state.orderid,
                "Status": "In-Transit"
            })
        })
        

    }

    componentDidMount() {
        //component is still loading
        this.setState({ loading: true });

        //Fetch the data from the persons to see if he is valid postman, only get postman
        fetch(global.backendURL + "persons", this.options)
            .then(function (response) {
                if (response.ok) return response.json();
                else[].json();
            })
            .then((data) => {
                this.registerPostmen = data;
                data.forEach(elemnt => {
                    this.state.registerPostmenObj.push(elemnt);
                    this.state.registerPostmen.push(elemnt.Email);
                })

                this.setState({ loading: false });
            });
    }


    render() {


        const allowedEmail = (value) => {
            console.error("email validataion");
            if (this.state.registerPostmen.indexOf(value) === -1) {
                return "Postman not register"
            }
            else {
                return undefined
            }
        }

        return (
            <div className="card">
                <div className="header">
                    <h4>Assign Package</h4>
                </div>
                <div className="content">
                    <form onSubmit={this.handleSubmit} className="form-horizontal">

                        <div className="form-group">
                            <label className="control-label col-md-3">Username/E-mail </label>
                            <div className="col-md-9">
                                <Field
                                    name="postmanEmailAssign"
                                    placeholder="abc@xyz.com"
                                    type="email"
                                    component={renderField}
                                    helpText="as appear on DC3 account" />
                            </div>
                            <button type="submit" className="btn btn-fill btn-info">Assign</button>
                        </div>

                    </form>
                </div>
            </div>

        )
    }
}

export default reduxForm({
    form: 'formElements'
})(Assign);