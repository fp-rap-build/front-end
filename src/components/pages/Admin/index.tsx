import React from 'react';
import UsersTable from './components/UsersTable';
import { Route } from 'react-router-dom';
import styles from '../../../styles/pages/admin.module.css';
import RequestsTable from './components/RequestsTable';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <UsersTable />
      </div>
    </div>
  );
}
