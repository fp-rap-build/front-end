import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import styles from '../../../styles/pages/admin.module.css';

import { axiosWithAuth } from '../../../api';

import { tableIcons } from '../../../utils/tableIcons';

import DeleteIcon from '@material-ui/icons/Delete';

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
            actionsColumnIndex: -1,
          }}
          actions={[
            rowData => ({
              icon: DeleteIcon,
              tooltip: 'Delete User',
              onClick: (event, rowData) => {
                let confirmed = window.confirm(
                  'Are you sure you want to delete this user'
                );

                if (!confirmed) return;

                setState({
                  ...state,
                  data: state.data.filter(row => row.id !== rowData.id),
                });
              },
              disabled: rowData.role == 'admin',
            }),
          ]}
          icons={tableIcons}
          title="Users"
          columns={state.columns}
          data={state.data}
        />
      </div>
    </div>
  );
}
