import React from 'react';

import { useSelector } from 'react-redux';

import styles from '../../../../../styles/pages/home.module.css';

import RentalAssistanceProgramBlurb from './components/RentalAssistanceProgramBlurb';
import StatusBar from './components/StatusBar';

export default function Index() {
  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>
          Hi {currentUser.firstName}, Welcome to the Family Promise Rental
          Assistance Program
        </h1>
        {!currentUser.isRequestingAssistance && (
          <RentalAssistanceProgramBlurb />
        )}
        {currentUser.requestStatus === 'approved' && (
          <h2>
            Your request for rental assistance has been accepted. An agent will
            reach out to you shortly
          </h2>
        )}
        {currentUser.requestStatus === 'denied' && (
          <h2>Your request for rental assistance has been denied.</h2>
        )}
        {currentUser.requestStatus === 'received' && (
          <h2>
            Thank you for using RAP. You will receive an email once an agent has
            reviewed your request
          </h2>
        )}
        {currentUser.requestStatus === 'inReview' && (
          <h2>
            Your request is currently being reviewed. You will receive an email
            shortly
          </h2>
        )}
      </div>

      <StatusBar user={currentUser} />
    </div>
  );
}
