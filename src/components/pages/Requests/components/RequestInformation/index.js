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

import { Card, Input, message, Modal } from 'antd';
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

export default function Index({
  request,
  setRequest,
  documents,
  setDocuments,
  budget,
  organizationId,
  setBudget,
}) {
  const [loading, setLoading] = useState(false);
  const [originalBudget, setOriginalBudget] = useState(budget);
  const [tab, setTab] = useState('basic');
  const [checklistValues, setChecklistValues] = useState({
    pmApproval: request.pmApproval,
    verifiedDocuments: request.verifiedDocuments,
  });

  const [amountToGive, setAmountToGive] = useState();

  const handleAmountToGive = e => {
    const { value } = e.target;

    const newBudget = originalBudget - value;

    if (newBudget < 0) return;

    if (isNaN(value)) return;

    if (value.split('')[0] === '0') return; // Can't give a request 0 dollars lol

    setBudget(newBudget);

    setAmountToGive(value);
  };

  const [isApprovedModalVisible, setIsApprovedModalVisible] = useState(false);

  const showApprovedModal = () => {
    setIsApprovedModalVisible(true);
  };

  const handleApprovalSubmit = async () => {
    setLoading(true);
    try {
      // approve request
      await axiosWithAuth().put(`/requests/${request.id}`, {
        requestStatus: 'approved',
      });

      setRequest({ ...request, requestStatus: 'approved' });

      // update the budget
      const newBudget = originalBudget - amountToGive;

      let res = await axiosWithAuth().put(`/orgs/${organizationId}`, {
        budget: newBudget,
      });

      message.success('Successfully approved request!');
    } catch (error) {
      message.error('Unable to approve request!');
    } finally {
      setIsApprovedModalVisible(false);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsApprovedModalVisible(false);
  };

  const pleaseFinishChecklistModal = () => {
    Modal.error({ title: 'Please finish everything on your checklist' });
  };

  const approvedModal = () => {};

  const deniedModal = (onOk, message) => {
    Modal.confirm({
      title:
        "Are you sure you want to deny this user? This change can't be undone",
      onOk,
    });
  };

  const handleReviewSubmit = status => {
    const alreadyReviewed =
      request.requestStatus === 'approved' ||
      request.requestStatus === 'denied';

    if (alreadyReviewed) {
      return message.error('This request has already been reviewed');
    }

    let completedChecklist = isChecklistCompleted(checklistValues);

    if (!completedChecklist) return pleaseFinishChecklistModal();

    const handleDenial = async () => {
      try {
        await axiosWithAuth().put(`/requests/${request.id}`, {
          requestStatus: status,
        });

        setRequest({ ...request, requestStatus: status });
      } catch (error) {
        alert('Failed to review user');
      }
    };

    if (status === 'approved') return showApprovedModal();
    if (status === 'denied') return deniedModal(handleDenial);
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
    setDocuments,
  };

  return (
    <div>
      <Modal
        title={`Budget: $${budget}`}
        visible={isApprovedModalVisible}
        onOk={handleApprovalSubmit}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <h3>Amount to give:</h3>
        <Input
          placeholder="amount"
          value={amountToGive}
          onChange={handleAmountToGive}
        />
      </Modal>

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
      return (
        <Documents
          documents={props.documents}
          setDocuments={props.setDocuments}
        />
      );
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
