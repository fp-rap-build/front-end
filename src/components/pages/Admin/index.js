import React, { useState } from 'react';

import MaterialTable from 'material-table';

import styles from '../../../styles/pages/admin.module.css';

import { tableIcons } from '../../../utils/tableIcons';

export default function Index() {
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'firstName', type: 'hidden' },
      { title: 'Last ', field: 'lastName' },
      { title: 'email', field: 'email', type: 'date' },
      { title: 'role', field: 'role' },
    ],
    data: [],
  });
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <MaterialTable
          options={{
            exportButton: true,
            rowStyle: rowData => ({
              backgroundColor:
                rowData.flag_level == 2
                  ? 'rgba(255, 255, 0, 0.419)'
                  : rowData.flag_level == 3
                  ? 'rgba(255, 0, 0, 0.418)'
                  : 'white',
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
