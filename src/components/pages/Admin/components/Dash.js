import React, { useState, useEffect } from 'react';

import ProgramMgrForm from './ProgramMgrForm';
import RequestsTable from './RequestsTable';
import UsersTable from './UsersTable';
import styles from '../../../../styles/pages/admin.module.css';

import { Button } from 'antd';
import { NONAME } from 'dns';

const Dash = () => {
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
      <h1>ADMIN DASH</h1>
      <div className={styles.dashNav}>
        <Button
          type="primary"
          size="large"
          disabled={display.usersTable}
          name="usersTable"
          onClick={onClick}
        >
          Manage Users
        </Button>
        <Button
          type="primary"
          size="large"
          disabled={display.requestsTable}
          name="requestsTable"
          onClick={onClick}
        >
          Manage Applications
        </Button>
        <Button
          type="primary"
          size="large"
          disabled={display.programMgrForm}
          name="programMgrForm"
          onClick={onClick}
        >
          Create Account Manager
        </Button>
      </div>
      <div>
        {display.usersTable && <UsersTable />}
        {display.requestsTable && <RequestsTable />}
        {display.programMgrForm && <ProgramMgrForm />}
      </div>
    </>
  );
};

export default Dash;
