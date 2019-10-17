

import React, { Component } from "react";
class About extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <a name="content" />
          <div>
            <h2 style={divStyle} >DC3 - Dillas Command and Control Center</h2>
          </div>
          <h4 style={divStyle1} >
          A multi-role Command-and-Control-Center for IoT equipped parcels
          </h4>
          <div>
            <p style={divStyle1} >
              Afraid of your shipment being damaged while on transport ? 
              Does your Courier company give you updates everytime they drop your package? 
              Or when your package has heated up drastically ? 
              <p style={divStyle2}>We Do !!</p> 
              Be it on a mobile device, or on a web application,
              We help you track your parcel entirely throughout its journey.<br />
              We allow our customers to track the temperature of the package.
              Also provide notifications when the package is dropped/damaged. 
              <p style={divStyle2}> Login to try! </p>
                       
              <span />
            </p>

          </div>
        </div>
      </div>
    );
  }
}

var divStyle = {
    background: "#eee",
    padding: "15px",
    margin: "30px",
    fontFamily : "Roboto",
  };
  

  var divStyle1 = {
    background: "#eee",
    padding: "15px",
    margin: "30px",
    fontFamily : "Roboto",
    fontStyle : "italic"
  };

  var divStyle2 = {
    background: "#eee",
    fontFamily : "Roboto",
    fontWeight : "bold"
  };
  
export default About;