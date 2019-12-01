import React from 'react';
import { Link } from 'react-router-dom';

function BoardHome() {
  return (
    <div className="col-xs-6 col-md-4 ml-5">
      <Link to="/board-list">
        <span className="d-inline-block p-0 border-1 border-white bg-success text-white rounded-lg">
          <i className="fa fa-home fa-2x pl-4 pr-3" aria-hidden="true" />
          {/* <h6 className="pt-1 text-align-center text-justify text-white ">
            Home
          </h6> */}
        </span>
      </Link>
    </div>
  );
}

export default BoardHome;
