import React from 'react';
import { Link } from 'react-router-dom';

function LogOut() {
  async function handleLogOutClicked() {
    if (document.cookie) {
      await fetch('http://localhost:3002/user/signout', {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));
    }
  }
  return (
    <div>
      <Link to="/signout">
        <input type="button" value="LogOut" onClick={handleLogOutClicked} />
      </Link>
    </div>
  );
}

export default LogOut;
