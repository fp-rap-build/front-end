import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import styles from '../../../../styles/pages/admin.module.css';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import GavelIcon from '@material-ui/icons/Gavel';

import Case from '../../../modals/Case';

export default function RequestsTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestBeingReviewed, setRequestBeingReviewed] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'firstName' },
      { title: 'Last ', field: 'lastName' },
      {
        title: 'email',
        field: 'email',
      },
      {
        title: 'Request Status',
        field: 'requestStatus',
        lookup: {
          received: 'Received',
          inReview: 'In Review',
          approved: 'Approved',
          denied: 'Denied',
        },
      },
      { title: 'date', field: 'requestDate', type: 'date' },
    ],
    data: [],
  });

  const fetchUsers = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/requests/table');
      setState({ ...state, data: res.data });
    } catch (error) {
      console.error(error.response);
      alert('error');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {isOpen && (
        <Case
          setIsOpen={setIsOpen}
          request={requestBeingReviewed}
          setRequest={setRequestBeingReviewed}
          setState={setState}
          state={state}
        />
      )}
      <MaterialTable
        style={{ width: '100%' }}
        isLoading={isFetching}
        options={{
          // Allows users to export the data as a CSV file
          exportButton: true,
        }}
        actions={[
          {
            icon: GavelIcon,
            tooltip: 'Review',
            onClick: async (event, rowData) => {
              // Update the users request to be in review
              setRequestBeingReviewed(rowData);
              setIsOpen(true);

              if (rowData.requestStatus === 'received') {
                await axiosWithAuth().put(`/requests/${rowData.id}`, {
                  requestStatus: 'inReview',
                });
              }
            },
          },
        ]}
        icons={tableIcons}
        title="Requests for Rental Assistance"
        columns={state.columns}
        data={state.data}
      />
    </div>
  );
}
