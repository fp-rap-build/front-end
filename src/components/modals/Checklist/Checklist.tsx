import { Button, Checkbox, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

const Checklist = props => {
  // state for checklist modal
  return (
    <>
      <Checkbox checked={props.allChecked}>
        Approved by Account Manager
      </Checkbox>
      <Checkbox checked={props.allChecked}>
        All documents recieved and reviewed
      </Checkbox>
    </>
  );
};

export default Checklist;
