import React from 'react';

import { Steps } from 'antd';
import {
  FileDoneOutlined,
  AuditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

import styles from './statusBar.module.css';

const { Step } = Steps;

const StatusBar = props => {
  const { user } = props;

  const statusToNum = status => {
    switch (status) {
      //Cases -- 'received' , 'inReview', 'approved', 'denied'
      case 'received':
        return 0;
      case 'inReview':
        return 1;
      case 'approved':
        return 2;
      case 'denied':
        return 2;
      default:
        return null;
    }
  };

  const currentStatus = statusToNum(user.requestStatus);

  return (
    <>
      <h2>Status Bar</h2>
      <Steps
        current={currentStatus}
        labelPlacement="vertical"
        className={styles.steps}
      >
        <Step
          icon={<FileDoneOutlined />}
          className={styles.completed}
          title="Received"
          description="Your application has been received by our Approval Team."
        ></Step>
        <Step
          icon={<FolderOpenOutlined />}
          title="In Review"
          description="Your application is being reviewed by our Approval Team"
        />
        <Step
          icon={<AuditOutlined />}
          title="Decision"
          description="Dyamic Decision responce here approved/denied with green/ red "
        />
      </Steps>
    </>
  );
};

export default StatusBar;
