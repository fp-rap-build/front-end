import React, { useState, useEffect } from 'react';

import { Basic, Checklist, Documents, Footer, TopActions } from './components';

import { Card } from 'antd';

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

export default function Index({ request, documents }) {
  const [tab, setTab] = useState('basic');
  const handleReviewSubmit = () => alert('submitted');

  const onTabChange = (key, type) => {
    setTab(key);
  };

  const props = { tab, handleReviewSubmit, request, documents };

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
