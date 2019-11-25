import React from 'react';
import { Link } from 'react-router-dom';

function UserNav() {
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
      <span>
        <Link to="/signout">
          <input type="button" value="LogOut" onClick={handleLogOutClicked} />
        </Link>
      </span>
      <span>
        <Link to="/setting">
          <input type="button" value="Settings" />
        </Link>
      </span>
    </div>
  );
}

export default UserNav;
