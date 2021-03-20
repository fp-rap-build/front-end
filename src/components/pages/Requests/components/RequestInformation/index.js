import React, { useState, useEffect } from 'react';

import { Basic, Checklist, Documents, Footer, TopActions } from './components';

import { Card, message } from 'antd';
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
];

export default function Index({ request, setRequest, documents }) {
  const [tab, setTab] = useState('basic');
  const [checklistValues, setChecklistValues] = useState({
    pmApproval: request.pmApproval,
    verifiedDocuments: request.verifiedDocuments,
  });

  const handleReviewSubmit = () => alert('submitted');

  const handleCheckboxChange = async e => {
    const { name, checked } = e.target;

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
    <Card
      className="site-page-header-responsive"
      title="Review"
      tabList={tabListNoTitle}
      onTabChange={onTabChange}
      activeTabKey={tab}
      style={{ minHeight: '400px', width: '100%' }}
      extra={[<TopActions handleReviewSubmit={props.handleReviewSubmit} />]}
    >
      <Content extra={<Footer request={props.request} />}>
        {renderContent(props)}
      </Content>
    </Card>
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
