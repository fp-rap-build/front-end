import React from 'react';

import { useHistory } from 'react-router-dom';

import logo from '../../../assets/logo.png';

import styles from '../../../styles/Layout/navbar.module.css';

function Navbar() {
  const redirectToHome = () => {
    history.push('/');
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  const history = useHistory();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <img
          alt="Calendar showing that rent is past due"
          onClick={redirectToHome}
          src={logo}
        />
        <ul className={styles.navActions}></ul>
      </nav>
    </div>
  );
}

export default Navbar;
