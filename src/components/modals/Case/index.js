import React, { useState } from 'react';

import { Menu, Dropdown, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import ModalContainer from '../ModalContainer';

import styles from '../../../styles/modals/case.module.css';

import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';

const { TabPane } = Tabs;

const renderContent = (column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="Name">Lili Qu</Descriptions.Item>
    <Descriptions.Item label="State">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Email">someemail@email.com</Descriptions.Item>
    <Descriptions.Item label="City">Pennsylvania</Descriptions.Item>
    <Descriptions.Item label="Role">Erie</Descriptions.Item>
    <Descriptions.Item label="Zip">16504</Descriptions.Item>
    <Descriptions.Item label="Organization">3211 East Ave</Descriptions.Item>
    <Descriptions.Item label="Address">3211 East Ave</Descriptions.Item>
  </Descriptions>
);

const Content = ({ children, extra }) => (
  <div className="content" styles={{ gap: '3rem' }}>
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const extraContent = (
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
      value="Pending"
      style={{
        marginRight: 32,
      }}
    />

    <Statistic
      title="Residents"
      value={2}
      style={{
        marginRight: 32,
      }}
    />

    <Statistic title="Monthly Income" prefix="$" value={568.08} />
  </div>
);

export default function Index() {
  return (
    <ModalContainer>
      <div className={styles.container}>
        <PageHeader
          className="site-page-header-responsive"
          onBack={() => alert('back')}
          title="Case"
          subTitle="Case"
          extra={[<JudgeDropdown />]}
        >
          <Content extra={extraContent}>{renderContent()}</Content>
        </PageHeader>
      </div>
    </ModalContainer>
  );
}

const JudgeDropdown = () => {
  const [value, setValue] = useState('approve');

  function handleButtonClick(e) {
    alert(value);
  }

  function handleMenuClick(e) {
    setValue(e.key);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item value="approve" key="approve" icon={<UserOutlined />}>
        Approve
      </Menu.Item>
      <Menu.Item key="deny" icon={<UserOutlined />}>
        Deny
      </Menu.Item>
    </Menu>
  );

  return (
    <Space wrap>
      <Dropdown.Button
        type="primary"
        onClick={handleButtonClick}
        overlay={menu}
      >
        {value}
      </Dropdown.Button>
    </Space>
  );
};
