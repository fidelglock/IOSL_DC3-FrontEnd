//Company dashboard file

import React from 'react';
//import EmailChart from './EmailChart';
//import SalesChart from './SalesChart';
//import UserBehaviorChart from './UserBehaviorChart';
//import Tasks from './Tasks';
//import TableWithLinks from '../Tables/ExtendedTables/TableWithLinks';
import UserTableWithLinks from '../Tables/ExtendedTables/UserTableWithLinks';
import PostmanHandoverTable from '../Tables/ExtendedTables/PostmanHandoverTable';
//import Register from '../Forms/RegularForms/Register';
import Assign from '../Forms/RegularForms/Assign';



// const Dashboard = () => (
  class CompanyDashboard extends React.Component{
    constructor(){
      super()
      this.state = {
      }
    }
    
   


    submit(values){
      console.log(values)
      fetch('http://localhost:8000/persons', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullname:"alon",
          email:"alon@tk.com",
          password:"321",
          dateofbirth:"2010-04-30T22:00:00.000Z",
        })
        })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err))
      }
      

  render(){
  return(
          <div className="content">
            <div className="container-fluid">
              
              <div className="row">
                <div className="col-md-12">
                  <PostmanHandoverTable />
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default CompanyDashboard;