import { Button, Checkbox, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

const Checklist = () => {
  // state for checklist modal
  const [isChecklistModalVisible, setisChecklistModalVisible] = useState(false);
  const showChecklistModal = () => setisChecklistModalVisible(true);
  const handle_Checklist_Modal_Ok = () => setisChecklistModalVisible(false);
  const handle_Checklist_Modal_Cancel = () => setisChecklistModalVisible(false);

  const checkList = (
    <>
      <Checkbox>Approved by Account Manager</Checkbox>
      <Checkbox>Approved by Program Manager</Checkbox>
      <Checkbox>Approved by Head Accountant</Checkbox>
      <Checkbox>Approved by Book keeper</Checkbox>
      <Checkbox>Approved by Account Manager</Checkbox>
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
