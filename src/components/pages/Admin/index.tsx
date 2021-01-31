import React from 'react';

import UsersTable from './components/UsersTable';

import styles from '../../../styles/pages/admin.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <UsersTable />
      </div>
    </div>
  );
}
