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
      { title: 'email', field: 'email', type: 'email' },
      {
        title: 'role',
        field: 'role',
        lookup: {
          admin: 'admin',
          tenant: 'tenant',
          landlord: 'landlord',
          pending: 'pending',
        },
      },
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
          editable={{
            isDeletable: rowData => rowData.role !== 'admin',
            isEditable: rowData => rowData.role !== 'admin',
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  alert('Hello');
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const index = oldData.tableData.id;

                  resolve();
                }, 1000);
              }),
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setState({ ...state, data: [...state.data, newData] });
                  resolve();
                }, 1000);
              }),
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
