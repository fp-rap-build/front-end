import React from 'react';

import { EditOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import styles from '../../../../styles/pages/admin.module.css';

const AdminNav = props => {
  const { activeComponent, handleClick } = props;

  return (
    <Menu
      className={styles.menu}
      onClick={handleClick}
      selectedKeys={activeComponent.current}
      mode="horizontal"
    >
      <Menu.Item className={styles.menuItem} key="user" icon={<UserOutlined />}>
        Manage Users
      </Menu.Item>
      <Menu.Item
        className={styles.menuItem}
        key="requests"
        icon={<EditOutlined />}
      >
        Manage Requests
      </Menu.Item>
      <Menu.Item
        className={styles.menuItem}
        key="prgMgr"
        icon={<UserAddOutlined />}
      >
        Create Program Manager
      </Menu.Item>
    </Menu>
  );
};

export default AdminNav;
