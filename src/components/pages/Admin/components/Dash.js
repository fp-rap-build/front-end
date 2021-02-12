import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ProgramMgrForm from './ProgramMgrForm';
import RequestsTable from './RequestsTable';
import UsersTable from './UsersTable';
import styles from '../../../../styles/pages/admin.module.css';

import { Button } from 'antd';

const Dash = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  // console.log(currentUser)
  const initialDisplay = {
    usersTable: true,
    requestsTable: false,
    programMgrForm: false,
  };

  const resetDisplay = {
    usersTable: false,
    requestsTable: false,
    programMgrForm: false,
  };
  const [display, setDisplay] = useState(initialDisplay);

  const onClick = e => {
    e.persist();
    //Ant-d buries the name in the event obj
    setDisplay({ ...resetDisplay, [e.target.offsetParent.name]: true });
  };

  return (
    <>
      <h1>Hello {currentUser.firstName}, welcome to your dashboard!</h1>
      <div className={styles.dashContainer}>
        <div className={styles.dashNav}>
          <Button
            type="primary"
            size="large"
            disabled={display.usersTable}
            name="usersTable"
            onClick={onClick}
            className={styles.button}
          >
            Manage Users
          </Button>
          <Button
            type="primary"
            size="large"
            disabled={display.requestsTable}
            name="requestsTable"
            onClick={onClick}
            className={styles.button}
          >
            Manage Requests
          </Button>
          <Button
            type="primary"
            size="large"
            disabled={display.programMgrForm}
            name="programMgrForm"
            onClick={onClick}
            className={styles.button}
          >
            Create Account Manager
          </Button>
        </div>
        <div className={styles.dashboard}>
          {display.usersTable && <UsersTable />}
          {display.requestsTable && <RequestsTable />}
          {display.programMgrForm && <ProgramMgrForm />}
        </div>
      </div>
    </>
  );
};

export default Dash;
