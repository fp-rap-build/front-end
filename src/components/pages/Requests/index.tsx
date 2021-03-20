import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import styles from '../../../styles/pages/request.module.css';

import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

import DocumentUploader from './components/RequestInformation/components/DocumentUploader';
import LoadingComponent from '../../common/LoadingComponent';
import RequestInformation from './components/RequestInformation';
import { message, Button } from 'antd';

export default function Index() {
  const { organizationId } = useSelector(state => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({});
  const [documents, setDocuments] = useState([]);

  const { id } = useParams();

  const history = useHistory();

  const returnToDash = e => {
    e.preventDefault();

    history.push('/admin');
  };

  const fetchRequest = async () => {
    setLoading(true);

    try {
      let requestInfo = await axiosWithAuth().get(`/requests/${id}`);

      let requestDocuments = await axiosWithAuth().get(
        `/requests/${id}/documents`
      );

      setRequest(requestInfo.data.request);
      setDocuments(requestDocuments.data.documents);
    } catch (error) {
      message.error('Unable to fetch request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.container}>
      <RequestInformation
        request={request}
        setRequest={setRequest}
        documents={documents}
      />
      <DocumentUploader setDocuments={setDocuments} request={request} />
      <Button onClick={returnToDash}>Return to Dash</Button>
    </div>
  );
}
