import { Checkbox } from 'antd';
import React from 'react';

const Checklist = ({ handleCheckboxChange, request }) => {
  return (
    <div>
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
