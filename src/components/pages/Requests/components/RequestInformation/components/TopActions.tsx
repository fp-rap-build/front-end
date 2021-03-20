import React, { useState } from 'react';

import { Menu, Dropdown, Space } from 'antd';

import { UserOutlined } from '@ant-design/icons';

export default function TopActions({ handleReviewSubmit }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '15%',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <JudgeDropdown handleReviewSubmit={handleReviewSubmit} />
    </div>
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
    <Space>
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
