import React from 'react';
import authLib from '../../config/authlib'
import Timeline from './Timeline'

const fetchOption = authLib.getFetchOptions();

const sharp = {
  display: "inline-block", 
  fontSize: "12px",
  width: "50%",
  padding: "5px"
  
} 
const values = {
  fontWeight: "Bold", 
  fontSize: "12px",
  display: "inline-block",
  padding: "5px"
} 

/**
 * the detailed class responisbale to presting the user packages in detiled view,
 * all the paramters the user entered will show
 * sensors:
 *  the user define limit\range for the shock\temperature sensore 
 *  here it will present  shcok sensor case "how many times the event happend"/"how many time the user asked" example 4/5 
 */
class Detailed extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
        loading: false,
        thePackage: {},
        items: [],
        id: props.match.params.OrderID,
        characters: {},
        timeHistory: null,
        load: false
    }
  }

/**
 * get the order id and get fetch from the database the order details
 * data is coming as a two objects (because of the different sensors )
 * the object will concatnate to one object.
 */
componentDidMount() {
  this.setState({ loading: true });
  console.log(this.state.id)
  var api =   "http://localhost:8000/packages/details/" + this.state.id
  fetch(api, fetchOption)
    .then(function(response){
      if (response.ok) {
          return response.json();
        } 
        else {
          throw new Error('Something went wrong ...');
        }
    })
    .then((data) => {
        console.log(data);
        if(data.length>1){
          var row = data[0];
          if(row.SensorId === 1)
          {
            row.heavy= data[1].heavy;
            row.light= data[1].light;
            row.severe= data[1].severe;
            row.valuerecorded= data[1].valuerecorded;
            
          }
          else{
            try{
              row.MaxThreshold = data[1].MaxThreshold;
              row.MinThreshold = data[1].MinThreshold;
            }
            catch(error){
              row.MaxThreshold = null
              row.MinThreshold = null
            }
          }
          console.log(row)
          this.state.items.push(row)
        }
        else{
          this.state.items.push(data[0]);
        }
          
          this.setState({
            loading: false})
          this.getOrderHistory()
        })
    .catch(function(error){
        console.log(error)
    })
}

/**
 * for presenting the timeline
 * get all thepackage history - handovers
 */
getOrderHistory() {
  var api =   "http://localhost:8000/orderHistory/" + this.state.id
  fetch(api, fetchOption)
    .then(function(response){
      if (response.ok) {
          return response.json();
        } 
        else {
          throw new Error('Something went wrong ...');
        }
    })
    .then((data) => {
        console.log("data from orderhistory")
        console.log(data);
        this.state.timeHistory=data
        this.setState({
          load:true
          
          
        });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
      }
      )
}


render() {
    return (
        <div>
            {this.state.items.map(item => (
              <div className = "row">
                  {!this.state.load?<h3>loading...</h3> : <Timeline history={this.state.timeHistory} / >}
                <br>
                </br>
                <div className = "col-md-12">
                    <div className = "col-md-6">
                      <div className="card">
                          <div className="header">
                              <h4 className="title">Package Information</h4>
                          </div>
                          <div className = "content ">                          
                                <div className = "control-label card"><h6 style={sharp}>Package Id: </h6><h6 style={values}>{item.OrderID }</h6></div>
                                <div className = "control-label card"><h6 style={sharp}>Pickup Address:</h6><h6 style={values}>{item.pickstreetaddress}</h6></div>
                                <div className = "control-label card"><h6 style={sharp}>Pickup City:</h6><h6 style={values}>{item.pickcity}</h6></div>
                                <div className = "control-label card"><h6 style={sharp}>Pickup Country:</h6><h6 style={values}>{item.pickcountry}</h6></div>
                                <div className = "control-label card"><h6 style={sharp}>Pickup PostCode:</h6><h6 style={values}>{item.pickpostcode}</h6></div>


                                <div className = "control-label card"><h6 style={sharp}>Drop Address:</h6><h6 style={values}> {item.dropstreetaddress}</h6></div>
                                <div className = "control-label card"><h6 style={sharp}>Drop City:</h6><h6 style={values}> {item.dropcity}</h6></div>
                                <div className = "control-label card"><h6 style={sharp}>Drop Country:</h6><h6 style={values}> {item.dropcountry}</h6></div>
                                <div className = "control-label card"><h6 style={sharp}>Drop PostCode:</h6><h6 style={values}> {item.droppostcode}</h6></div>

                                <div className = "control-label card"><h6 style={sharp}>Company name</h6> <h6 style={values}>{item.Name}</h6> </div>
                                <div className = "control-label card"> <h6 style={sharp}> Status: </h6> <h6 style={values}>{item.Status}</h6></div>
                                {/* conditional render, only show in case the user wanted sensors with the package */}
                                { item.light !== null ?
                                <div>
                                  <div className = "control-label card"><h6 style={sharp}>shock sensor-light</h6> <h6 style={values}>0/{item.light}</h6> </div>
                                  <div className = "control-label card"><h6 style={sharp}>shock sensor-heavy</h6> <h6 style={values}>0/{item.heavy}</h6> </div>
                                  <div className = "control-label card"><h6 style={sharp}>shock sensor-severe</h6> <h6 style={values}>0/{item.severe}</h6> </div>
                                </div> 
                                : undefined}
                                { item.MinThreshold !== null ?
                                <div className = "control-label card"><h6 style={sharp}>temperature sesnor</h6> <h6 style={values}>{item.MinThreshold} &lt;  {(item.MaxThreshold + item.MinThreshold)/2} &lt;  {item.MaxThreshold}</h6> </div>
                                : undefined}
                            
                          </div>
                      </div>
                    </div>
              </div>     
            </div>
            ))}

        </div>
    )    
}
}
export default Detailed;




