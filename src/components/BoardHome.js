import React from 'react';
import { Link } from 'react-router-dom';

function BoardHome() {
  return (
    <div>
      <Link to="/board-list">
        <span>BoardHome</span>
      </Link>
    </div>
  );
}

export default BoardHome;
