import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Select, Button } from 'antd';

import styles from '../../../../styles/pages/create.module.css';

import createAcctMgr from '../utils/createAcctManager';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const INITIAL_VALUES = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: 'account manager',
  organization_id: 1,
  // organization: 'Family Promise of Spokane',
  // role: 'account manager',
};

const AcctMgrForm = () => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [orgs, setOrgs] = useState([]);

  const history = useHistory();

  const fetchOrgs = async () => {
    try {
      let res = await axiosWithAuth().get('/orgs');
      setOrgs(res.data);
    } catch (error) {
      console.log(error);
      alert('error');
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onOrgChange = value => {
    setFormValues({ ...formValues, organization_id: value });
  };

  const handleSumbit = async e => {
    const msg = await createAcctMgr(formValues);
    setFormValues(INITIAL_VALUES);
    history.push('/admin');
    alert(msg);
  };

  return (
    <div className={styles.container}>
      <h2>Create a Program Manager:</h2>
      <Form className={styles.form} layout="vertical">
        <Form.Item
          initialValue={formValues.firstName}
          label="First Name"
          name="firstName"
        >
          <Input
            name="firstName"
            placeholder="Jane"
            value={formValues.firstName}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.lastName}
          label="Last Name"
          name="lastName"
        >
          <Input
            name="lastName"
            placeholder="Doe"
            value={formValues.lastName}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item initialValue={formValues.email} label="E-mail" name="email">
          <Input
            name="email"
            placeholder="example@mail.com"
            value={formValues.email}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.organization}
          label="Organization"
          name="organization"
        >
          <Select onChange={onOrgChange} placeholder="Select an Organization">
            {orgs.map(org => (
              <Select.Option value={org.id}>{org.organization}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <Button onClick={handleSumbit}>Submit</Button>
    </div>
  );
};

export default AcctMgrForm;
