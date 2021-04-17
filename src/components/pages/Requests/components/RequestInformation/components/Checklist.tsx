import styles from '../../../../../../styles/pages/request.module.css';

import { Checkbox, Typography } from 'antd';
const { Title } = Typography;

const marginFix = {
  marginLeft: '0',
};

const Checklist = ({ handleCheckboxChange, request }) => {
  return (
    <div className={styles.checklistsContainer}>
      <PreApprovalChecklist
        handleCheckboxChange={handleCheckboxChange}
        request={request}
      />
      <PostApprovalChecklist />
    </div>
  );
};

const PreApprovalChecklist = ({ handleCheckboxChange, request }) => {
  return (
    <div className={styles.checklist}>
      <Title level={5}>Pre-Approval Checklist</Title>
      <Checkbox
        checked={request.verifiedDocuments}
        name="verifiedDocuments"
        onChange={handleCheckboxChange}
      >
        All documents received and verified
      </Checkbox>
      <Checkbox
        checked={request.pmApproval}
        name="pmApproval"
        onChange={handleCheckboxChange}
        style={marginFix}
      >
        Approved by program manager
      </Checkbox>
      <Checkbox style={marginFix}>
        Rent payment ledger received from landlord
      </Checkbox>
    </div>
  );
};

const PostApprovalChecklist = props => {
  return (
    <div className={styles.checklist}>
      <Title level={5}>Post-Approval Checklist</Title>
      <Checkbox>Placeholder</Checkbox>
      <Checkbox style={marginFix}>Placeholder</Checkbox>
      <Checkbox style={marginFix}>Placeholder</Checkbox>
      <Checkbox style={marginFix}>Placeholder</Checkbox>
    </div>
  );
};

export default Checklist;
