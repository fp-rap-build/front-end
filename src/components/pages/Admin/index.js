import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import styles from '../../../styles/pages/admin.module.css';

import { axiosWithAuth } from '../../../api';

import { tableIcons } from '../../../utils/tableIcons';

import DeleteIcon from '@material-ui/icons/Delete';

export default function Index() {
  const [isFetching, setIsFetching] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'firstName' },
      { title: 'Last ', field: 'lastName' },
      { title: 'email', field: 'email', type: 'email', editable: 'never' },
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
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/users');
      setState({ ...state, data: res.data });
    } catch (error) {
      console.log(error);
      alert('error');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <MaterialTable
          isLoading={isFetching}
          options={{
            exportButton: true,
          }}
          editable={{
            isDeletable: rowData => rowData.role !== 'admin',
            isEditable: rowData => rowData.role !== 'admin',
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setState({
                    ...state,
                    data: state.data.map(row => {
                      if (row.id == oldData.id) {
                        return newData;
                      }
                      return row;
                    }),
                  });
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
