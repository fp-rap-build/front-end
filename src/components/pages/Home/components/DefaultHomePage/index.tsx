import React from 'react';

import { useSelector } from 'react-redux';

import { Space, Typography } from 'antd';

import styles from '../../../../../styles/pages/home.module.css';

import StatusBar from './components/StatusBar';

export default function Index() {
  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <div className={styles.container}>
      <div>
        <Typography.Title level={2} className={styles.heading}>
          {' '}
          Hi {currentUser.firstName}, Welcome to the Family Promise Rental
          Assistance Program
        </Typography.Title>
      </div>
      <StatusBar user={currentUser} />
    </div>
  );
}
