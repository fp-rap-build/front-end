import React, { useState, useEffect } from 'react';

import styles from '../../../styles/pages/request.module.css';

import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

import DocumentUploader from '../../../components/pages/Home/components/DefaultHomePage/components/DocumentUploader';
import LoadingComponent from '../../common/LoadingComponent';
import RequestInformation from './components/RequestInformation';
import { message } from 'antd';

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({});
  const [documents, setDocuments] = useState([]);

  const { id } = useParams();

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
      <DocumentUploader request={request} />
    </div>
  );
}
