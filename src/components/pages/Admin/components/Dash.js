import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AdminNav from './adminNav';
import ProgramMgrForm from './ProgramMgrForm';
import RequestsTable from './RequestsTable';
import UsersTable from './UsersTable';
import styles from '../../../../styles/pages/admin.module.css';

import { Typography, Layout } from 'antd';
const { Title } = Typography;
const { Content, Header, Footer } = Layout;

const Dash = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const [activeComponent, setActiveComponent] = useState({ current: 'user' });

  const handleClick = e => {
    setActiveComponent({ current: e.key });
  };

  return (
    <Layout>
      <Header className={styles.headingNav}>
        <Title
          level={3}
          className={styles.headingText}
          style={{ color: '#FFFFFF' }}
        >
          Hello {currentUser.firstName}, welcome to your dashboard!
        </Title>
        <AdminNav activeComponent={activeComponent} handleClick={handleClick} />
      </Header>
      <Content className={styles.dashboard}>
        {activeComponent.current === 'user' && <UsersTable />}
        {activeComponent.current === 'requests' && <RequestsTable />}
        {activeComponent.current === 'prgMgr' && <ProgramMgrForm />}
      </Content>
      <Footer className={styles.footer} />
    </Layout>
  );
};

export default Dash;
