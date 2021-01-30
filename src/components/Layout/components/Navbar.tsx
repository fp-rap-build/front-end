import React, { useState, useEffect, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styles from '../../../styles/Layout/navbar.module.css';

import { useOktaAuth } from '@okta/okta-react';

function Navbar() {
  const { authState, authService } = useOktaAuth();

  const currentUser = useSelector(state => state.user.currentUser);

  const redirectToHome = () => {
    if (authState.isAuthenticated) {
      history.push('/');
    }
    return;
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  const history = useHistory();
  const handleLogout = () => {
    authService.logout();
    localStorage.clear();
  };

  return (
    <nav className={styles.nav}>
      <div onClick={redirectToHome} className={styles.logo}>
        <h2>RAP</h2>
      </div>

      <ul className={styles.navActions}>
        {authState.isAuthenticated ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li onClick={redirectToLogin}>Login</li>
        )}
      </ul>
    </nav>
  );
}

const AdminActions = () => {
  return (
    <>
      <li>Users</li>
    </>
  );
};

export default Navbar;
