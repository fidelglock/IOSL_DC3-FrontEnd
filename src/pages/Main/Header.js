import React from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility   } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';


const handleLogout = () => {
  sessionStorage.removeItem('googleAuth');
  sessionStorage.removeItem('userAuth');
  sessionStorage.removeItem('userAuthToken');
  global.isAuthenticated = false;
  
  //TODO: Redirect to home page
  window.location.href = '/';
}

const Header = ({
  toggleMobileNavVisibility
}) => (
  <Navbar fluid={true}>
  <Navbar.Header>
    <button type="button" className="navbar-toggle" data-toggle="collapse" onClick={handleLogout}>
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
  </Navbar.Header>

      <Navbar.Collapse>

        <div className="separator"></div>
        <Navbar.Form pullLeft>
        </Navbar.Form>
        <Nav pullRight>
          <NavItem onClick={()=> handleLogout()}><a  href="/" ></a>Log out</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );



const mapDispatchToProp = dispatch => ({
  toggleMobileNavVisibility: () => dispatch(toggleMobileNavVisibility()),
  handleLogout: ()=> dispatch(handleLogout)
});

export default connect(null)(Header);