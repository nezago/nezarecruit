/* eslint-disable react/no-unused-state */
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
import axios from 'axios';
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
    axios.get('/jobs/get-all-jobs?isTMP=false').then((res) => {
      this.setState({ postedJobs: res.data });
    }).catch((err) => {
      this.setState({ errorDuringJobRetrieval: err.response.data });
    });
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
    const {
      isTogglerOpen, necessaryFields, postedJobs,
    } = this.state;
    let jobsTitles;
    if (postedJobs) {
      jobsTitles = postedJobs.map((job) => (
        <div key={job.job_id}>
          <NavLink
            className="dropdown-item"
            navlink-to-components="true"
            to={`/jobs${job.application_form_url}/${job.job_id}`}
            onClick={() => handleOptionClicked(necessaryFields)}
          >
            {job.job_title}
          </NavLink>
        </div>
      ));
    }
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
            <Nav className="form-inline mt-auto mr-auto" navbar>
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
                        {jobsTitles}
                      </div>

                    </div>

                  </li>
                </ul>
              </nav>
            </Nav>
            <Nav className="form-inline mt-auto ml-auto" navbar>
              <nav>
                <ul>
                  <li><a href="/enter-nezago">Gate</a></li>
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
