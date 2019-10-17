import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { stat } from 'fs';


class Nav extends Component {

  constructor(props){
    super(props)

    this.state={
      persontype:1 //fall back to minimum functionality
    }
  }
  

  render() {
    let { location } = this.props;

    //check the logged in user and render the menu accordingly
    var userObj = JSON.parse(sessionStorage.getItem('userAuth'));
    if (userObj && userObj.PersonType) {
      this.state.persontype = userObj.PersonType;
    }
   
    if (this.state.persontype == 1) {
      //User Navigation bar
      return (
        <ul className="nav">
          <li className={location.pathname === '/Dashboard' ? 'active' : null}>
            <Link to="/">
              <i className="pe-7s-graph"></i>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className={this.isPathActive('/forms') || this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-id"></i>
            <p>Package Management<b className="caret"></b></p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/packages/registerPackage') ? 'active' : null}>
                  <Link to="/packages/registerPackage">Register Package</Link>
                </li>
                <li className={this.isPathActive('/packages/active') ? 'active' : null}>
                  <Link to="/packages/active">Delete Package</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
          <li className={this.isPathActive('/forms') || this.state.formMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ formMenuOpen: !this.state.formMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-note2"></i>
            <p>Incident Management<b className="caret"></b></p>
          </a>
          <Collapse in={this.state.formMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/forms/incident-form') ? 'active' : null}>
                  <Link to="/forms/incident-form">Create incident</Link>
                </li>
                <li className={this.isPathActive('/Incidents/viewIncident') ? 'active' : null}>
                  <Link to="/viewIncident">Incidents</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        </ul>
      );
    }
    

    else if(this.state.persontype == 2){
      //Company
      return (
      <ul className="nav">
          <li className={location.pathname === '/' ? 'active' : null}>
            <Link to="/">
              <i className="pe-7s-graph"></i>
              <p>Dashboard</p>
            </Link>
          </li>

          

          <li className={this.isPathActive('/components') || this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              User Management
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
                  <li className={this.isPathActive('/UpgradeUser') ? 'active' : null}>
                  
                  <Link to="/UpgradeUser">Postman Management</Link>
                </li>
                <li className={this.isPathActive('/company') ? 'active' : null}>
                  <Link to="/company">Assign Package</Link>
                </li>
              </ul>
            </div>
          </Collapse>
    </li>

          <li className={this.isPathActive('/forms') || this.state.formMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ formMenuOpen: !this.state.formMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-note2"></i>
            <p>Incident Management<b className="caret"></b></p>
          </a>
          <Collapse in={this.state.formMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/forms/incident-form') ? 'active' : null}>
                  <Link to="/forms/incident-form">Create incident</Link>
                </li>
                <li className={this.isPathActive('/Incidents/viewIncident') ? 'active' : null}>
                  <Link to="/viewIncident">Incidents</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        </ul>
      );
    }
    else if (this.state.persontype == 3){
      //PostMan
      return (
<ul className="nav">
          <li className={location.pathname === '/' ? 'active' : null}>
            <Link to="/">
              <i className="pe-7s-graph"></i>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className={this.isPathActive('/components') || this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Package Management
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
                  <li className={this.isPathActive('/postman/handoverdetails') ? 'active' : null}>
                  <Link to="/postman/handoverdetails">Handover</Link>
                </li>
                <li className={this.isPathActive('/postman') ? 'active' : null}>
                  <Link to="/postman">Postman </Link>
                  </li>
              </ul>
            </div>
          </Collapse>
    </li>

               <li className={this.isPathActive('/forms') || this.state.formMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ formMenuOpen: !this.state.formMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-note2"></i>
            <p>Incident Management<b className="caret"></b></p>
          </a>
          <Collapse in={this.state.formMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/forms/incident-form') ? 'active' : null}>
                  <Link to="/forms/incident-form">Create incident</Link>
                </li>
                <li className={this.isPathActive('/Incidents/viewIncident') ? 'active' : null}>
                  <Link to="/viewIncident">Incidents</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        </ul>
          );    }

  }
        

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);