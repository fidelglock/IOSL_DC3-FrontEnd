import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import authLib from '../../../config/authlib'

class UserTableWithLinks extends Component {
  constructor(){
    super()
    this.state = {
      package: {},
      items : [],
      isLoading: false,
      error:null,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true }); 
    const options = authLib.getFetchOptions()  ;  
    fetch("http://localhost:8000/persons",options)
      .then(function(response){
        if (response.ok) {
            return response.json();
          } 
          else {
            throw new Error('Something went wrong ...');
          }
      })
      .then((data) => {
          console.log(data)
            data.forEach(elemnt => {
                this.state.items.push(elemnt)
            })
            this.setState({isLoading: false })
            console.log(this.state.items);
            console.log(this.state.items.length);

      })
      .catch(function(error){
          console.log(error)
      })
  }




  deleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    });
  }

  render() {
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">Users</h4>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>

                <th>Person Type</th>
                
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <tr key={item.ID} >
                  <td><Link to={`/persons/${item.ID}`} style={{color: 'blue'}}>
                      {item.ID}
                      </Link>
                  </td>                  
                  <td>{item.FullName}</td>
                  <td>{item.Email}</td>
                  <td>{item.PersonType == 1 ? "Customer" : (item.PersonType ==2 ? "Company":"Postman")}</td>
                  <td className="text-middle">
                      <Link to={`/persons/${item.ID}`}>
                        <div className="btn btn-info" >edit</div>
                      </Link>                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}

export default UserTableWithLinks;