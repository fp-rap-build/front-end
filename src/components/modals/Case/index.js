import React, { useState, useEffect } from 'react';

import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import ModalContainer from '../ModalContainer';

import styles from '../../../styles/modals/case.module.css';

import Basic from './components/Basic';

import Documents from './components/Documents';

import TopActions from './components/TopActions';

import Footer from './components/Footer';

import { Card } from 'antd';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import Checklist from '../Checklist/Checklist';

const { confirm } = Modal;

const tabListNoTitle = [
  {
    key: 'basic',
    tab: 'Basic',
  },
  {
    key: 'documents',
    tab: 'Documents',
  },
  {
    key: 'checklist',
    tab: 'Checklist',
  },
];

const pleaseFinishChecklistModal = () => {
  Modal.error({ title: 'Please finish everything on your checklist' });
};

const approveOrDenyModal = (message, onOk) => {
  confirm({
    title: message,
    onOk,
  });
};

export default function Index({
  setIsOpen,
  request,
  setRequest,
  setState,
  state,
}) {
  const [tab, setTab] = useState('basic');
  const [documents, setDocuments] = useState([]);
  const [checklistValues, setChecklistValues] = useState({
    pmApproval: request.pmApproval,
    verifiedDocuments: request.verifiedDocuments,
  });

  // Fetch documents
  const fetchDocuments = async () => {
    try {
      let allDocuments = await axiosWithAuth().get(
        `/requests/${request.id}/documents`
      );

      setDocuments(allDocuments.data.documents);
    } catch (error) {
      message.error(
        'unable to fetch documents, please try again and report this'
      );
    }
  };

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line
  }, []);

  const handleReviewSubmit = async status => {
    const props = { setIsOpen, status, setState };

    // Make sure all checkboxes are checked
    for (let key in checklistValues) {
      let unChecked = !checklistValues[key];
      if (unChecked) {
        return pleaseFinishChecklistModal();
      }
    }

    let message = `Are you sure you want to ${
      status === 'approved' ? 'approve' : 'deny'
    } this request?`;

    const onOk = async () => {
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

    return approveOrDenyModal(message, onOk);
  };

  const onTabChange = (key, type) => {
    setTab(key);
  };

  const handleCheckboxChange = async e => {
    const { name, checked } = e.target;

    setChecklistValues({
      ...checklistValues,
      [name]: checked,
    });

    // update table
    setState({
      ...state,
      data: state.data.map(row => {
        if (row.id === request.id) {
          row[name] = checked;
        }
        return row;
      }),
    });

    // persist changes
    try {
      let res = await axiosWithAuth().put(`/requests/${request.id}`, {
        [name]: checked,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error.response);
      message.error(
        'Unable to persist changes to checklist. Please report this'
      );
    }
  };

  const props = { tab, request, documents, handleCheckboxChange };

  return (
    <ModalContainer onClick={() => setIsOpen(false)}>
      <div onClick={e => e.stopPropagation()} className={styles.container}>
        <Card
          className="site-page-header-responsive"
          onBack={() => setIsOpen(false)}
          title="Review"
          tabList={tabListNoTitle}
          onTabChange={onTabChange}
          activeTabKey={tab}
          style={{ minHeight: '400px', width: '100%' }}
          extra={[<TopActions handleReviewSubmit={handleReviewSubmit} />]}
        >
          <Content extra={<Footer request={props.request} />}>
            {renderContent(props)}
          </Content>
        </Card>
      </div>
    </ModalContainer>
  );
}

const renderContent = props => {
  switch (props.tab) {
    case 'basic':
      return <Basic request={props.request} />;
    case 'checklist':
      return (
        <Checklist
          handleCheckboxChange={props.handleCheckboxChange}
          request={props.request}
        />
      );
    case 'documents':
      return <Documents documents={props.documents} />;
    default:
      return <Basic request={props.request} />;
  }
};

const Content = ({ children, extra }) => (
  <div className="content" styles={{ gap: '3rem' }}>
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);
