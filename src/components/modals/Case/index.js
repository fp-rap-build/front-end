import React, { useState } from 'react';

import { Menu, Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import ModalContainer from '../ModalContainer';

import styles from '../../../styles/modals/case.module.css';

import { init } from 'emailjs-com';

import sendEmail from '../../../utils/sendEmail';

import { PageHeader, Statistic, Descriptions, Card } from 'antd';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

init(process.env.REACT_APP_EMAIL_USER_ID);

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

  const handleReviewSubmit = async status => {
    let confirm = window.confirm(
      `Are you sure you want to ${
        status === 'approved' ? 'approve' : 'deny'
      } this user?`
    );
    if (!confirm) return;

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

    try {
      await axiosWithAuth().put(`/requests/${request.id}`, {
        requestStatus: status,
      });

      let message =
        status === 'approved'
          ? 'You have been approved for our Rental Assistance Program'
          : 'You have been denied the rental assistance program';

      const emailPayload = {
        to_name: request.firstName + ' ' + request.lastName,
        from_name: 'Family Promise Rental Assistance Program (RAP)',
        user_email: request.email,
        message,
      };

      sendEmail(emailPayload);
    } catch (error) {
      alert('Failed to review user');
    }
  };

  const onTabChange = (key, type) => {
    setTab(key);
  };

  const props = { tab, request };

  return (
    <ModalContainer>
      <div className={styles.container}>
        <Card
          className="site-page-header-responsive"
          onBack={() => setIsOpen(false)}
          title="Review"
          tabList={tabListNoTitle}
          onTabChange={onTabChange}
          activeTabKey={tab}
          extra={[<JudgeDropdown handleReviewSubmit={handleReviewSubmit} />]}
        >
          <Content extra={extraContent(request)}>
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
      return basicInfo(props.request);
    case 'checklist':
      return checkList();
    case 'documents':
      return documentInfo();
  }
};

const basicInfo = (request, column = 2) => (
  <Descriptions size="large" column={column}>
    <Descriptions.Item label="Name">{`${request.firstName} ${request.lastName}`}</Descriptions.Item>
    <Descriptions.Item label="State">{request.state}</Descriptions.Item>
    <Descriptions.Item label="Email">{request.email}</Descriptions.Item>
    <Descriptions.Item label="City">{request.cityName}</Descriptions.Item>
    <Descriptions.Item label="Role">{request.role}</Descriptions.Item>
    <Descriptions.Item label="Zip">{request.zipCode}</Descriptions.Item>
    <Descriptions.Item label="Organization">none</Descriptions.Item>
    <Descriptions.Item label="Address">{request.address}</Descriptions.Item>
  </Descriptions>
);

const documentInfo = () => <h1>Documents</h1>;

const checkList = () => <h1>Checklist</h1>;

const Content = ({ children, extra }) => (
  <div className="content" styles={{ gap: '3rem' }}>
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const extraContent = request => (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
      gap: '1rem',
    }}
  >
    <Statistic
      title="Status"
      value={request.requestStatus}
      style={{
        marginRight: 32,
      }}
    />

    <Statistic
      title="Residents"
      value={request.familySize}
      style={{
        marginRight: 32,
      }}
    />
    <Statistic
      title="Monthly Income"
      prefix="$"
      value={request.monthlyIncome}
    />
  </div>
);

const JudgeDropdown = ({ handleReviewSubmit }) => {
  const [status, setStatus] = useState('approved');

  function handleMenuClick(e) {
    setStatus(e.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="approved" icon={<UserOutlined />}>
        Approve
      </Menu.Item>
      <Menu.Item key="denied" icon={<UserOutlined />}>
        Deny
      </Menu.Item>
    </Menu>
  );

  return (
    <Space wrap>
      <Dropdown.Button
        type="primary"
        onClick={() => handleReviewSubmit(status)}
        overlay={menu}
      >
        {status === 'approved' ? 'approve' : 'deny'}
      </Dropdown.Button>
    </Space>
  );
};
