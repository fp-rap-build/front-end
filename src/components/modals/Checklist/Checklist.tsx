import { Button, Checkbox, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

const Checklist = ({ handleCheckboxChange, request }) => {
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
      <Checkbox
        checked={request.verifiedDocuments}
        name="verifiedDocuments"
        onChange={handleCheckboxChange}
      >
        All documents received and verified
      </Checkbox>
      <br />
      <Checkbox
        checked={request.pmApproval}
        name="pmApproval"
        onChange={handleCheckboxChange}
      >
        Approved by program manager
      </Checkbox>
    </div>
  );
};

export default Checklist;
