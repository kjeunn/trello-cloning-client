import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'reactstrap';

function GuestNav() {
  return (
    <div>
      <Nav className="navbar navbar-light bg-light justify-content-between">
        <span className="navbar-brand mb-0 h1 ml-5 pt-3">
          <h3 className="text-justify">Trello</h3>
        </span>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link to="/signin">
              <input
                className="btn btn-outline-dark my-2 my-sm-0 mr-2"
                type="button"
                value="SignIn"
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup">
              <input
                className="btn btn-outline-dark my-2 my-sm-0 mr-5"
                type="button"
                value="SignUp"
              />
            </Link>
          </li>
        </ul>
      </Nav>
    </div>
  );
}

export default GuestNav;
