import React from 'react';
import Register from './Register';
import authLib from '../../config/authlib'

const fetchOption = authLib.getFetchOptions();

  class UserSpace extends React.Component{
    /*
      the user sapce is a controller for the Registration compenent.
      after the user enter the data in the Registration, the data is being process here.

      algorithem for register the new package:
        1. get the addresses of the sender and reciever and post to the DB
        2. the state (of sender and reciever) is getting updated
        3. addPackage fucntion start (only after the state has updated)
          3.1 posting to DB the state.
          3.2 get back form the backend the orderid
          3.3 update orderhistory endpoint to register the new package event

    */
    constructor(props){
      super(props)
      this.state = {
        api : 'http://localhost:8000/address',
        addressID : 0,
        recieverID: 0,
        light: 0,
        heavy: 0,
        severe: 0,
        tempValues : [2 , 4],
        orderID: null,
        tempOn : false,
        shcockOn: false,
        success: false,
        chosenCompany:{"name":"select..."}
      }
      this.submit = this.submit.bind(this);
      this.addPackage =  this.addPackage.bind(this)
      this.handleChange =  this.handleChange.bind(this)
      this.TempChange =  this.TempChange.bind(this)
      this.getAdressId =  this.getAdressId.bind(this)
      this.addSensore =  this.addSensore.bind(this)
      this.assignPackage = this.assignPackage.bind(this)
      this.addToOrderHistory = this.addToOrderHistory.bind(this)
    }

    /**
     * only for the shcok sensor
     * getting a schock event ( when updating the numbers)
     * update the numebr to the state
     * @param {the view content when the event happened } event 
     */
    handleChange(event) { 
      const {name, value} = event.target
      console.log(name, value)
      this.setState({
          [name]: value
      })
  }
    /**
     * only for the temp sensor
     * update the temo values
     * @param {temperature values - array} value 
     */
    TempChange(value) { 
      console.log(value)
      this.setState({
        tempValues: value
      })
  }
    
    /**
     * when the user press the sumbit the following happens:
     *  *register the user address to the system to get back from the backend an ID
     * @param {values as user inserted to form} values. 
     */
    submit(values){
      console.log("sumbit start")
      console.log(values)
      console.log(this.state)

      if ("Temp" in values){
        console.log("temp true")
        this.setState({tempOn:values.Temp})
      }
      if ("shock" in values){
        console.log("shock true")
        this.setState({shcockOn: values.shock})
      }

      const sender = {
        "street":values.street,
	      "city":values.city,
	      "country": values.country,
	      "postcode": values.zip
      }
      const rec = {
        "street":values.dstreet,
	      "city":values.dcity,
	      "country": values.dcountry,
	      "postcode": values.dzip
      }
      this.getAdressId(sender, "sender")
      this.getAdressId(rec, "reciever")
      }

    /**
     *  fettching the address id from the table.
        set the state thereciver adress and sender .
     * @param {object contain the "street","city","country","postcode } values 
     * @param {sender or reciever} flag incates if the data came from the sender or reciever
     */
    getAdressId(values,flag){
      console.log("get adreess id started with flag:" + flag)
      fetch("http://localhost:8000/address",  {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'x-access-token': fetchOption.headers['x-access-token']
        },
        body: JSON.stringify({
          "street":values.street,
          "city":values.city,
          "country": values.country,
          "postcode": Number(values.postcode)
        })
        })
          .then(res => res.json())
          .then((data) => {
              console.log(data)
              if (flag === "sender"){
                this.setState({
                  addressID : data.AddressID})
              }
              else{
                this.setState({
                  recieverID : data.AddressID})
              }
            })
          .catch(err => console.log(err))
      }
    
    /*
    1.creating a date object1
    2. add the package to DB.
    3. In case there are sensors request, update the sensors in DB
    4. add the package to timeline history
    */
    addPackage(){
      console.log("starting to add package")
      console.log("reciever: " + this.state.recieverID)
      console.log("sender: " + this.state.addressID)
      const options = authLib.getUserObj() ;
      console.log(options)
      const userID = options.ID
      console.log("costumer id: " + userID)

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      today = mm + '-' + dd + '-' + yyyy;
      fetch("http://localhost:8000/packages", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'x-access-token': fetchOption.headers['x-access-token']
        },
        body: JSON.stringify({
          "pickaddressid":this.state.addressID,
          "dropaddressid":this.state.recieverID,
          "pickdate": today,
          "arrivaldate": null,
          "personid": userID,
          "receieverid":34,
          "status": "Registered",
          "companyId":Number(this.state.chosenCompany)
        })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.state.orderID = data.OrderID
            if (this.state.tempOn )
            {
              console.log("temp on ");
              const tempObj = {
                "orderId":this.state.orderID,
                "sensorId":1,
                "minThreshold": this.state.tempValues[0],
                "maxThreshold": this.state.tempValues[1]
              }
              this.addSensore(tempObj) 
            }
            if (this.state.shcockOn)
            {
              console.log("shock on ");
              const shockObj = {
                "orderId":this.state.orderID,
                "sensorId":2,
                "light": this.state.light,
                "heavy": this.state.heavy,
                "severe": this.state.severe
              }
              this.addSensore(shockObj)
            }
            this.addToOrderHistory(today)
        })
        .catch(err => console.log(err))      
      console.log("finished add package");
      return "The package have been registered. Thank you"
        
    }

    /**
     * adding a sensor to the DB 
     * @param {sensor content} sensorBody 
     */
    addSensore(sensorBody){
    /*
     
    */
      console.log("add sensor started");
      console.log(this.state.orderID)
      fetch("http://localhost:8000/OrderSensors", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'x-access-token': fetchOption.headers['x-access-token']
        },
        body: JSON.stringify(
          sensorBody
        )
        })
        .then(res => res.json())
        .then(
          (data) => {
            console.log(data)
        }
        )

      console.log("finished add Sensor");
    }
    /**
     * adding a snsor according to the user wish
     * @param {the date} today date
     */
    addToOrderHistory(today){
      console.log("add addToOrderHistory started");
      console.log(this.state.orderID)
      fetch("http://localhost:8000/OrderHistory", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'x-access-token': fetchOption.headers['x-access-token']
        },
        body: JSON.stringify({
          "orderId": this.state.orderID,
          "handoverDate":today,
          "status": "Registered"
        })
        })
        .then(res => res.json())
        .then(
          (data) => {
            console.log(data)
        }
        )

      console.log("finished addToOrderHistory");
    }

//Kiran Added function starts here
    assignPackage(values){
      /*
        input state : order id ,company id, and corresponding values
        the function post the data into the orederHistory table.  
      */
        console.log("assign package started");
        console.log(this.state.orderID)
        fetch("http://localhost:8000/orderHistory", {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'x-access-token': fetchOption.headers['x-access-token']
          },
          body: JSON.stringify({
          "orderID" : values.OrderID,
          "postmanID":values.postmanID,
          "citcompanyID":values.companyID,
          "status": "Intransit"  
          })
          })
          .then(res => res.json())
          .then((data) => {
              console.log(data)
          })
  
        console.log("finished add Sensor");
      }

      //.......Kiran Added function ends here
  render(){
  return(
          <div className="content">
            <div className="container-fluid">
            {/* if reciever id is zero default view  */}
            {this.state.recieverID === 0 || this.state.addressID ===0 ? 
              <div className="row">
                <div className="col-md-9">
                  <Register 
                    onSubmit={this.submit} 
                    light={this.state.light}
                    heavy={this.state.heavy}
                    severe={this.state.severe}
                    tempertureValues={this.state.tempValues}
                    tempChange={this.TempChange}
                    chosenCompany={this.state.chosenCompany}
                    handleChange={this.handleChange} />
                </div> 
              </div> : 
                <h2>{this.addPackage()}</h2>}
                 {/* if recieverID is not zero means that the user pressed sumbit and change the state. */}
            </div>
          </div>
    );
  }
}

export default UserSpace;