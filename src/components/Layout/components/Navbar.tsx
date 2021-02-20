import React from 'react';

import { useHistory } from 'react-router-dom';

import logo from '../../../assets/logo.png';

import styles from '../../../styles/Layout/navbar.module.css';

import { useOktaAuth } from '@okta/okta-react';

function Navbar() {
  const { authState, authService } = useOktaAuth();

  const redirectToHome = () => {
    history.push('/');
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
    <div className={styles.container}>
      <nav className={styles.nav}>
        <img
          alt="Calendar showing that rent is past due"
          onClick={redirectToHome}
          src={logo}
        />
        <ul className={styles.navActions}>
          {authState.isAuthenticated ? (
            <li onClick={handleLogout}>Logout</li>
          ) : (
            <li onClick={redirectToLogin}>Login</li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
