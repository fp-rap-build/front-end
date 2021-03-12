import { Button, Checkbox, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

const Checklist = props => {
  // state for checklist modal
  return (
    <>
      <label htmlFor="AccountManager">
        <input id="AccountManager" type="checkbox" onChange={props.onChange} />
        Approved by Account Manager
      </label>
    </>
  );
};

export default Checklist;
