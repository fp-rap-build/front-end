import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import styles from '../../../styles/pages/request.module.css';

import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

import DocumentUploader from './components/RequestInformation/components/DocumentUploader';
import LoadingComponent from '../../common/LoadingComponent';
import RequestInformation from './components/RequestInformation';
import { message } from 'antd';

export default function Index() {
  const { organizationId } = useSelector(state => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({
    id: undefined,
    requestStatus: '',
  });

  const [documents, setDocuments] = useState([]);
  const [budget, setBudget] = useState([]);

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

  const fetchBudget = async () => {
    try {
      let org = await axiosWithAuth().get(`/orgs/${organizationId}`);

      setBudget(org.data.budget);
    } catch (error) {
      message.error('error fetching budget');
    }
  };

  const changeStatusToInReview = async () => {
    if (request.requestStatus === 'received') {
      setRequest({ ...request, requestStatus: 'inReview' });
      try {
        await axiosWithAuth().put(`/requests/${request.id}`, {
          requestStatus: 'inReview',
        });
      } catch (error) {
        message.error('Unable to update request status');
      }
    }
  };

  useEffect(() => {
    fetchRequest();
    fetchBudget();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    changeStatusToInReview();
  }, [request]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.container}>
      <RequestInformation
        request={request}
        setRequest={setRequest}
        documents={documents}
        setDocuments={setDocuments}
        budget={budget}
        organizationId={organizationId}
        setBudget={setBudget}
      />
      <DocumentUploader setDocuments={setDocuments} request={request} />
    </div>
  );
}
