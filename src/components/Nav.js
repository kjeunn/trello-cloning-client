import React from 'react';
import UserNav from './UserNav';
import GuestNav from './GuestNav';

function Nav() {
  const isToken = document.cookie;
  if (isToken) {
    return <UserNav />;
  }
  return <GuestNav />;
}

export default Nav;
