import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl,NavLink } from 'react-bootstrap';
import LogoDC3 from 'assets/images/dc3_logo.jpg';


const Header = ({
}) => (
  <Navbar fluid={true}>
  <Navbar.Header>
    <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
  </Navbar.Header>

      <Navbar.Collapse>
      
        <Navbar.Form pullLeft>
        </Navbar.Form>
        <Nav pullRight> 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
export default connect(null)(Header);