import React from 'react';
import {
  EditOutlined,
  UserAddOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';

import styles from '../../../../styles/pages/admin.module.css';

const AdminNav = props => {
  const { activeComponent, handleClick } = props;

  const menu = (
    <Menu onClick={handleClick} selectedKeys={activeComponent.current}>
      <Menu.Item key="analytics" icon={<UserOutlined />}>
        Analytics
      </Menu.Item>
      <Menu.Item key="requests" icon={<EditOutlined />}>
        Manage Requests
      </Menu.Item>
      <Menu.Item key="user" icon={<UserOutlined />}>
        Manage Users
      </Menu.Item>
      <Menu.Item key="prgMgr" icon={<UserAddOutlined />}>
        Create Program Manager
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} className={styles.dropdown}>
      <Button type="primary">
        Navigate <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default AdminNav;
