import React, { useState } from 'react';

import { Input, Button, Menu, Dropdown, Space, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import ModalContainer from '../ModalContainer';

import styles from '../../../styles/modals/case.module.css';

import { init } from 'emailjs-com';

import sendEmail from '../../../utils/sendEmail';

import { PageHeader, Statistic, Descriptions } from 'antd';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import Comments from '../Comments/Comments';

init(process.env.REACT_APP_EMAIL_USER_ID);

export default function Index({ setIsOpen, user, setUser, setState, state }) {
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
        if (row.id === user.id) {
          row['requestStatus'] = status;
        }
        return row;
      }),
    });

    setIsOpen(false);

    try {
      await axiosWithAuth().put(`/users/${user.id}`, { requestStatus: status });

      let message =
        status === 'approved'
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

const JudgeDropdown = ({ handleReviewSubmit }) => {
  const [status, setStatus] = useState('approved');

  // state for checklist modal
  const [isChecklistModalVisible, setisChecklistModalVisible] = useState(false);
  const showChecklistModal = () => setisChecklistModalVisible(true);
  const handle_Checklist_Modal_Ok = () => setisChecklistModalVisible(false);
  const handle_Checklist_Modal_Cancel = () => setisChecklistModalVisible(false);

  // Destructuring the textarea component from Input for comments
  const { TextArea } = Input;

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

  const checkList = (
    <>
      <Checkbox onChange={console.log('This worked')}>
        Approved by Account Manager
      </Checkbox>
      <Checkbox onChange={console.log('This worked')}>
        Approved by Program Manager
      </Checkbox>
      <Checkbox onChange={console.log('This worked')}>
        Approved by Head Accountant
      </Checkbox>
      <Checkbox onChange={console.log('This worked')}>
        Approved by Book keeper
      </Checkbox>
      <Checkbox onChange={console.log('This worked')}>
        Approved by Account Manager
      </Checkbox>
    </>
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
      <>
        <Button type="primary" onClick={showChecklistModal}>
          Approval Checklist
        </Button>
        <Modal
          title="Checklist Modal"
          visible={isChecklistModalVisible}
          onOk={handle_Checklist_Modal_Ok}
          onCancel={handle_Checklist_Modal_Cancel}
        >
          {checkList}
        </Modal>
      </>
      <Comments />
    </Space>
  );
};
