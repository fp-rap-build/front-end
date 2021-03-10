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
  const handle_Checklist_Modal_State = checkedValues => {
    // TODO: add if statement that checks if all checkboxes are checked
    checkedValues.length !== 2
      ? setIsCheckboxChecked(false)
      : setIsCheckboxChecked(true);
  };

  const options = [
    {
      label: 'Approved by Promgram Manager',
      value: 'Approved by Promgram Manager',
    },
    {
      label: 'All documents recieved and reviewed',
      value: 'All documents recieved and reviewed',
    },
  ];
  const checkList = (
    <>
      <Checkbox.Group
        options={options}
        onChange={handle_Checklist_Modal_State}
      />
      {options.forEach(item => console.log(item))}
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
