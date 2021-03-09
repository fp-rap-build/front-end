import { Button, Checkbox, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

const Checklist = () => {
  // state for checklist modal
  const [isChecklistModalVisible, setisChecklistModalVisible] = useState(false);
  const [isCheckboxModalChecked, setIsCheckboxChecked] = useState(false);

  const showChecklistModal = () => setisChecklistModalVisible(true);
  const handle_Checklist_Modal_Ok = () => setisChecklistModalVisible(false);
  const handle_Checklist_Modal_Cancel = () => setisChecklistModalVisible(false);
  const handle_Checklist_Modal_State = () => {
    // TODO: add if statement that checks if all checkboxes are checked
    setIsCheckboxChecked(false);
  };

  const checkList = (
    <>
      <Checkbox>Approved by Account Manager</Checkbox>
      <Checkbox>Approved by Program Manager</Checkbox>
      <Checkbox>Approved by Head Accountant</Checkbox>
      <Checkbox>Approved by Book keeper</Checkbox>
    </>
  );

  const options = [
    {
      label: 'Approved by Account Manager',
      value: 'Approved by Account Manager',
    },
    {
      label: 'Approved by Promgram Manager',
      value: 'Approved by Promgram Manager',
    },
    {
      label: 'Approved by Head Accountant',
      value: 'Approved by Head Accountant',
    },
    { label: 'Approved by Book keeper', value: 'Approved by Book keeper' },
  ];
  const checkList2 = (
    <>
      <Checkbox.Group
        options={options}
        onChange={handle_Checklist_Modal_State}
      />
    </>
  );
  return (
    <>
      <Button type="primary" onClick={showChecklistModal}>
        Approval Checklist
      </Button>
      <Modal
        title="Checklist Modal"
        visible={isChecklistModalVisible}
        onOk={handle_Checklist_Modal_Ok}
        onCancel={handle_Checklist_Modal_Cancel}
      >
        {checkList}
      </Modal>
    </>
  );
};

export default Checklist;
