/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { handleOptionClicked, handleToggler } from '../helpers/functions/handlers';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTogglerOpen: false,
      necessaryFields: {},
    };
  }

  componentDidMount() {
    const necessaryFields = {
      navbarContainer: document.getElementById('navbar-container'),
      brandLogo: document.getElementById('brand-logo'),
      optionsContainer: document.getElementById('options-container'),
    };
    this.setState({ necessaryFields });
    const navbarLinks = document.querySelectorAll('a[navlink-to-components]');
    navbarLinks.forEach((currNavLink) => {
      if (currNavLink.classList.contains('active')) {
        necessaryFields.navbarContainer.classList.add('bg-custom');
        necessaryFields.navbarContainer.classList.remove('bg-unscrolled');
        necessaryFields.brandLogo.classList.remove('brand-logo-lg');
        necessaryFields.brandLogo.classList.add('brand-logo-sm');
        necessaryFields.optionsContainer.classList.remove('navbar-options');
      }
    });
  }

  render() {
    const { isTogglerOpen, necessaryFields } = this.state;
    return (
      <div>
        <Navbar
          id="navbar-container"
          expand="md"
          className="sticky-element bg-unscrolled navbar-container"
        >
          <NavbarBrand href="/">
            <span>
              <img
                id="brand-logo"
                className="brand-logo-lg"
                src="/img/logo/nezaLogo.png"
                alt="Neza-logo"
              />
            </span>

          </NavbarBrand>
          <NavbarToggler onClick={() => handleToggler(this)} />
          <Collapse
            isOpen={isTogglerOpen}
            navbar
            id="options-container"
            className="navbar-options"

          >
            <Nav className="form-inline mt-auto ml-auto" navbar>
              <nav>

                <ul>
                  <li>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        data-toggle="dropdown"
                        id="jobsDropdownBtn"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Jobs
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="jobsDropdownBtn"
                      >
                        <NavLink
                          className="dropdown-item"
                          navlink-to-components="true"
                          to="/apply-for-junior-software-developer"
                          onClick={() => handleOptionClicked(necessaryFields)}
                        >
                          Software developer at Neza

                        </NavLink>
                      </div>
                    </div>

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
