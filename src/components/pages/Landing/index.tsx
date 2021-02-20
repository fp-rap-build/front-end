import React from 'react';

import styles from '../../../styles/pages/landing.module.css';

import Button from '../../common/Button';

export default function Index() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.contentContainer}>
          <h1>Are you in need of Rental Assistance?</h1>
          <p>
            Family Promise of Spokane can help provide relief to residents who
            have missed payments or are struggling to pay their current rent due
            to the pandemic. Landlords are also encouraged to request assistance
            with past due rent owed to them
          </p>
          <Button>Apply for Rental Assistance</Button>
        </div>
      </header>
    </div>
  );
}
