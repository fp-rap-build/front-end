import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import { message } from 'antd';

const fetchDocuments = async requestId => {
  try {
    let allDocuments = await axiosWithAuth()
      .get(`/requests/${requestId}/documents`)
      .then(res => res.data.documents);

    return allDocuments;
  } catch (error) {
    message.error(
      'unable to fetch documents, please try again and report this'
    );
  }
};

const onOk = async ({ setState, state, request, setIsOpen, status }) => {
  setState({
    ...state,
    data: state.data.map(row => {
      if (row.id === request.id) {
        row['requestStatus'] = status;
      }
      return row;
    }),
  });
  try {
    await axiosWithAuth().put(`/requests/${request.id}`, {
      requestStatus: status,
    });
  } catch (error) {
    alert('Failed to review user');
  } finally {
    setIsOpen(false);
  }
};

export { onOk, fetchDocuments };
