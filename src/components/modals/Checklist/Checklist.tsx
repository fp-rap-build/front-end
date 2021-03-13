import { Button, Checkbox, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

const Checklist = ({ handleCheckboxChange }) => {
  // state for checklist modal
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '0.3rem',
      }}
    >
      <Checkbox name="verifiedDocuments" onChange={handleCheckboxChange}>
        All documents received and verified
      </Checkbox>
      <br />
      <Checkbox name="pmApproval" onChange={handleCheckboxChange}>
        Approved by program manager
      </Checkbox>
    </div>
  );
};

export default Checklist;
