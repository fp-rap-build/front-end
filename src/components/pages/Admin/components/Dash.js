import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AdminNav from './adminNav';
import ProgramMgrForm from './ProgramMgrForm';
import RequestsTable from './RequestsTable';
import UsersTable from './UsersTable';
import styles from '../../../../styles/pages/admin.module.css';

import { Button } from 'antd';

const Dash = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const [activeComponent, setActiveComponent] = useState({ current: 'user' });

  const handleClick = e => {
    console.log('click ', e);
    setActiveComponent({ current: e.key });
  };

  return (
    <div className={styles.container}>
      <h1>Hello {currentUser.firstName}, welcome to your dashboard!</h1>
      <div className={styles.dashContainer}>
        <AdminNav activeComponent={activeComponent} handleClick={handleClick} />
        <div className={styles.dashboard}>
          {activeComponent.current === 'user' && <UsersTable />}
          {activeComponent.current === 'requests' && <RequestsTable />}
          {activeComponent.current === 'prgMgr' && <ProgramMgrForm />}
        </div>
      </div>
    </div>
  );
};

export default Dash;
