import React from 'react';

import { Steps } from 'antd';

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

  console.log('Test Switch should be one');

  return (
    <>
      <h2>Status Bar</h2>
      <Steps
        current={statusToNum(user.requestStatus)}
        responsive
        className={styles.steps}
      >
        <Step
          title="Received"
          description="Your application was succesfully created and received by our approval team."
        />
        <Step
          title="In Review"
          description="Your application is currently being reviewed by our Approval Team"
        />
        <Step
          title="Decision"
          description="Dyamic Decision responce here approved/denied with green/ red "
        />
      </Steps>
    </>
  );
};

export default StatusBar;
