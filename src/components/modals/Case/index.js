import React, { useState, useEffect } from 'react';

import { message } from 'antd';

import ModalContainer from '../ModalContainer';

import styles from '../../../styles/modals/case.module.css';

import Basic from './components/Basic';

import Documents from './components/Documents';

import TopActions from './components/TopActions';

import Footer from './components/Footer';

import { Card } from 'antd';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import Checklist from '../Checklist/Checklist';

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

export default function Index({
  setIsOpen,
  request,
  setRequest,
  setState,
  state,
}) {
  const [tab, setTab] = useState('basic');
  const [isChecked, setIsChecked] = useState([]);
  const [documents, setDocuments] = useState([]);

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
    // Confirm approval/denial
    let confirm = window.confirm(
      `Are you sure you want to ${
        status === 'approved' ? 'approve' : 'deny'
      } this user?`
    );

    if (!confirm) return;

    // Update state inside table
    setState({
      ...state,
      data: state.data.map(row => {
        if (row.id === request.id) {
          row['requestStatus'] = status;
        }
        return row;
      }),
    });

    setIsOpen(false);

    // Update request status
    try {
      await axiosWithAuth().put(`/requests/${request.id}`, {
        requestStatus: status,
      });
    } catch (error) {
      alert('Failed to review user');
    }
  };

  const onTabChange = (key, type) => {
    setTab(key);
  };

  const props = { tab, request, documents, isChecked };

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
  const handleChecked = e => {
    const isChecked = e.target.checked;

    if (isChecked === true) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  switch (props.tab) {
    case 'basic':
      return <Basic request={props.request} />;
    case 'checklist':
      return <Checklist onChange={e => handleChecked(e)} />;
    case 'documents':
      return <Documents documents={props.documents} />;
    default:
      return <Basic request={props.request} />;
  }
};

const checkList = () => <h1>Checklist</h1>;

const Content = ({ children, extra }) => (
  <div className="content" styles={{ gap: '3rem' }}>
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);
