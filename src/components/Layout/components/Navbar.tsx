import React, { useState } from 'react';

import { useHistory, Link } from 'react-router-dom';

import styles from '../../../styles/Layout/navbar.module.css';

import { useOktaAuth } from '@okta/okta-react';

import { useSelector } from 'react-redux';

import RequestsTable from '../../pages/Admin/components/RequestsTable';

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

  const redirectToRequestsPage = () => {
    return (
      <Link to="/requests">
        <li style={{ color: 'black' }}>Requests</li>
      </Link>
    );
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
        {currentUser.role == 'admin' && <AdminActions />}

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
  const history = useHistory();
  return (
    <>
      <li onClick={() => history.push('/requests')}>Requests</li>
      <li onClick={() => history.push('/admin')}>Users</li>
    </>
  );
};

export default Navbar;
