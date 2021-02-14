import React from 'react';

import Dash from './components/Dash';
import styles from '../../../styles/pages/admin.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <Dash />
        {/* <UsersTable />
        <Button
          type="primary"
          className={styles.button}
          onClick={() => history.push('/create')}
        >
          Create Program Manager
        </Button> */}
      </div>
    </div>
  );
}
