import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { handleApproval, handleDenial, isChecklistCompleted } from './utils';

import {
  Basic,
  Checklist,
  Documents,
  Footer,
  TopActions,
  Comments,
} from './components';

import { Card, message, Modal } from 'antd';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

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
  { key: 'comments', tab: 'Comments' },
];

const pleaseFinishChecklistModal = () => {
  Modal.error({ title: 'Please finish everything on your checklist' });
};

const approveOrDenyModal = (onOk, message) => {
  Modal.confirm({
    title: message,
    onOk,
  });
};

export default function Index({ request, setRequest, documents }) {
  const [tab, setTab] = useState('basic');
  const [checklistValues, setChecklistValues] = useState({
    pmApproval: request.pmApproval,
    verifiedDocuments: request.verifiedDocuments,
  });

  const handleReviewSubmit = status => {
    let completedChecklist = isChecklistCompleted(checklistValues);

    if (!completedChecklist) return pleaseFinishChecklistModal();

    const handleApproveOrDenial = async () => {
      try {
        await axiosWithAuth().put(`/requests/${request.id}`, {
          requestStatus: status,
        });

        setRequest({ ...request, requestStatus: status });
      } catch (error) {
        alert('Failed to review user');
      }
    };

    let message = `Are you sure you want to ${
      status === 'approved' ? 'approve' : 'deny'
    } this user?`;

    return approveOrDenyModal(handleApproveOrDenial, message);
  };

  const handleCheckboxChange = async e => {
    const { name, checked } = e.target;

    setChecklistValues({ ...checklistValues, [name]: checked });

    setRequest({ ...request, [name]: checked });

    // persist changes
    try {
      let res = await axiosWithAuth().put(`/requests/${request.id}`, {
        [name]: checked,
      });
    } catch (error) {
      message.error(
        'Unable to persist changes to checklist. Please report this'
      );
    }
  };

  const onTabChange = (key, type) => {
    setTab(key);
  };

  const props = {
    tab,
    handleReviewSubmit,
    handleCheckboxChange,
    request,
    documents,
  };

  return (
    <div>
      <Card
        className="site-page-header-responsive"
        title="Review"
        tabList={tabListNoTitle}
        onTabChange={onTabChange}
        activeTabKey={tab}
        style={{ minHeight: '400px', width: '100%' }}
        extra={[<TopActions handleReviewSubmit={props.handleReviewSubmit} />]}
      >
        <Content
          extra={tab !== 'comments' ? <Footer request={props.request} /> : null}
        >
          {renderContent(props)}
        </Content>
      </Card>
    </div>
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
    case 'comments':
      return <Comments request={props.request} />;
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
