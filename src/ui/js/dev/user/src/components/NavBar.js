/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import {
  Row,
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import jwt from 'jsonwebtoken';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTogglerOpen: false,
    };
  }

  componentDidMount() {
    const gottenTokenInfo = jwt.decode(window.localStorage.getItem('oauth'));
    this.setState({ gottenTokenInfo });
  }

  handleToggler = () => {
    const { isTogglerOpen } = this.state;
    this.setState({ isTogglerOpen: !isTogglerOpen });
  };

  handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('oauth');
    window.location.replace('/');
  }

  render() {
    const { isTogglerOpen } = this.state;
    const { gottenTokenInfo } = this.state;
    let userAuthorities;
    let userFname;
    if (gottenTokenInfo) {
      userAuthorities = gottenTokenInfo.user_authorities;
      userFname = gottenTokenInfo.fname;
    }
    const SUPERUSER_NAV_ITEMS = (
      <nav>
        <ul className="nav-ul">
          <li><NavLink to="#">Manage applications</NavLink></li>
          <li><NavLink to="#">Publish a job</NavLink></li>
        </ul>
      </nav>
    );
    return (
      <div>
        <Navbar dark expand="md" className="bg-custom sticky-element">
          <NavbarBrand href="/">NezaRecruit</NavbarBrand>
          <NavbarToggler onClick={this.handleToggler} />
          <Collapse
            isOpen={isTogglerOpen}
            navbar
            className="text-white"
          >
            <Nav className="form-inline ml-auto" navbar>
              <Row>
                <div className="col-md-12 text-center">
                  {userAuthorities === 'SUPERUSER' ? SUPERUSER_NAV_ITEMS : ''}
                  <NavLink to="#">{userFname}</NavLink>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-corners"
                    type="button"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </Row>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
