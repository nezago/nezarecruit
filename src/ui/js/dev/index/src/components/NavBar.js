/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Row
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTogglerOpen: false,
    };
  }

  handleToggler = () => {
    const { isTogglerOpen } = this.state;
    this.setState({ isTogglerOpen: !isTogglerOpen });
  }

  render() {
    const { isTogglerOpen } = this.state;

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
              <nav>
                <ul>
                  <li>
                    <NavLink to="/apply-for-junior-software-developer">
                      Apply for Junior software developer
                      </NavLink>
                  </li>
                  <li><a href="/enter-nezado">Gate</a></li>
                </ul>
              </nav>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
