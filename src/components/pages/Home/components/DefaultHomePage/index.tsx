import React from 'react';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import styles from '../../../../../styles/pages/home.module.css';

import { Button } from 'antd';

import LandlordBlurb from './components/LandlordBlurb';
import TenantBlurb from './components/TenantBlurb';

export default function Index() {
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser);

  //Evt Handler to send to form
  const routeToForm = () => {
    history.push('/request');
  };

  return (
    <div className={styles.container}>
      <div className={styles.blurb}>
        <h1>
          Hi {currentUser.firstName}, Welcome to the Family Promise Rental
          Assistance Program
        </h1>
        {currentUser.role === 'landlord' ? <LandlordBlurb /> : <TenantBlurb />}
      </div>

      <p>
        {currentUser.isRequestingAssistance ? (
          <p>
            {' '}
            Current Application Status <span>{currentUser.requestStatus}</span>
          </p>
        ) : (
          <Button type="primary" size="large" onClick={routeToForm}>
            Apply for Rental Assistance
          </Button>
        )}
      </p>
    </div>
  );
}
