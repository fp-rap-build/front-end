import React, { useState } from 'react';

import { FormOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const AdminNav = () => {
  const [state, setState] = useState({ current: 'user' });

  const handleClick = e => {
    console.log('click ', e);
    setState({ current: e.key });
  };

  return (
    <Menu onClick={handleClick} selectedKeys={state.current} mode="horizontal">
      <Menu.Item key="user" icon={<UserOutlined />}>
        Manage Users
      </Menu.Item>
      <Menu.Item key="requests" icon={<FormOutlined />}>
        Manage Requests
      </Menu.Item>
      <Menu.Item key="prgMgr" icon={<UserAddOutlined />}>
        Create Program Manager
      </Menu.Item>
    </Menu>
  );
};

export default AdminNav;
