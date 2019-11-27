/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';

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
        <Navbar dark expand="md" className="bg-custom sticky-element width-98">
          <NavbarBrand href="/">NezaRecruit</NavbarBrand>
          <NavbarToggler onClick={this.handleToggler} />
          <Collapse
            isOpen={isTogglerOpen}
            navbar
            className="text-white"
          >
            <Nav className="form-inline ml-auto" navbar>
              <nav>
                <ul className="nav-ul">
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
