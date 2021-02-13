import React, { useState } from 'react';

import { Menu, Dropdown, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import ModalContainer from '../ModalContainer';

import styles from '../../../styles/modals/case.module.css';

import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

const { TabPane } = Tabs;

const renderContent = (user, column = 2) => (
  <Descriptions size="large" column={column}>
    <Descriptions.Item label="Name">{`${user.firstName} ${user.lastName}`}</Descriptions.Item>
    <Descriptions.Item label="State">{user.state}</Descriptions.Item>
    <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
    <Descriptions.Item label="City">{user.cityName}</Descriptions.Item>
    <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
    <Descriptions.Item label="Zip">{user.zipCode}</Descriptions.Item>
    <Descriptions.Item label="Organization">none</Descriptions.Item>
    <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
  </Descriptions>
);

const Content = ({ children, extra }) => (
  <div className="content" styles={{ gap: '3rem' }}>
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const extraContent = user => (
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
      value={user.requestStatus}
      style={{
        marginRight: 32,
      }}
    />

    <Statistic
      title="Residents"
      value={user.familySize}
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Monthly Income" prefix="$" value={user.monthlyIncome} />
  </div>
);

export default function Index({ setIsOpen, user }) {
  const handleReviewSubmit = async status => {
    try {
      await axiosWithAuth().put(`/users/${user.id}`, { requestStatus: status });
      alert('success');
    } catch (error) {
      alert('Failed to review user');
    }
  };

  return (
    <ModalContainer>
      <div className={styles.container}>
        <PageHeader
          className="site-page-header-responsive"
          onBack={() => setIsOpen(false)}
          title="Review"
          extra={[<JudgeDropdown handleReviewSubmit={handleReviewSubmit} />]}
        >
          <Content extra={extraContent(user)}>{renderContent(user)}</Content>
        </PageHeader>
      </div>
    </ModalContainer>
  );
}

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
        {status == 'approved' ? 'approve' : 'deny'}
      </Dropdown.Button>
    </Space>
  );
};
