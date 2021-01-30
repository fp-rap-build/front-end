import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import styles from '../../../styles/pages/admin.module.css';

import { axiosWithAuth } from '../../../api';

import { tableIcons } from '../../../utils/tableIcons';

export default function Index() {
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'firstName' },
      { title: 'Last ', field: 'lastName' },
      { title: 'email', field: 'email', type: 'date' },
      { title: 'role', field: 'role' },
    ],
    data: [],
  });

  const fetchUsers = async () => {
    try {
      let res = await axiosWithAuth().get('/users');
      setState({ ...state, data: res.data });
    } catch (error) {
      console.log(error);
      alert('error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <MaterialTable
          options={{
            exportButton: true,
          }}
          icons={tableIcons}
          title="Users"
          columns={state.columns}
          data={state.data}
        />
      </div>
    </div>
  );
}
