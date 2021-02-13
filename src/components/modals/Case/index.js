import React, { useState } from 'react';

import { Menu, Dropdown, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import ModalContainer from '../ModalContainer';

import styles from '../../../styles/modals/case.module.css';

import { init } from 'emailjs-com';

import sendEmail from '../../../utils/sendEmail';

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

export default function Index({ setIsOpen, user, setUser, setState, state }) {
  init('user_zfW4LQVBXyGr4lWRUgfZE');

  const handleReviewSubmit = async status => {
    setState({
      ...state,
      data: state.data.map(row => {
        if (row.id === user.id) {
          row['requestStatus'] = status;
        }
        return row;
      }),
    });

    let confirm = window.confirm(
      `Are you sure you want to ${
        status == 'approved' ? 'approve' : 'deny'
      } this user?`
    );

    if (!confirm) return;

    setIsOpen(false);

    try {
      await axiosWithAuth().put(`/users/${user.id}`, { requestStatus: status });

      let message =
        status == 'approved'
          ? 'You have been approved for our Rental Assistance Program'
          : 'You have been denied the rental assistance program';

      const emailPayload = {
        to_name: user.firstName + ' ' + user.lastName,
        from_name: 'Family Promise Rental Assistance Program (RAP)',
        user_email: user.email,
        message,
      };

      sendEmail(emailPayload);
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
