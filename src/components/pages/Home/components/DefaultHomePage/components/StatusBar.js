import React from 'react';

import { Steps } from 'antd';

import styles from './statusBar.module.css';

const { Step } = Steps;

const StatusBar = props => {
  return (
    <>
      <div>
        <h2>Status Bar</h2>
        <p>Track three phases - changing stat with each </p>
      </div>
      <Steps>
        <Step
          title="Received"
          description="Your application was succesfully created and received by our approval team"
        />
        <Step />
      </Steps>
    </>
  );
};

export default StatusBar;
