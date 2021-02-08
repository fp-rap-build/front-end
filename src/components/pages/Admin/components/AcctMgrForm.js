import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

import createAcctMgr from '../utils/createAcctManager';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const INITIAL_VALUES = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: 'familypromise',
  role: 'account manager',
  organization_id: 1,
  // organization: 'Family Promise of Spokane',
  // role: 'account manager',
};

const AcctMgrForm = () => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [orgs, setOrgs] = useState([]);

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

  //Evt Handlers
  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onOrgChange = value => {
    setFormValues({ ...formValues, organization_id: value });
  };

  const handleSumbit = async e => {
    e.preventDefault();
    try {
      const oktaID = await createAcctMgr(formValues);
      console.log(oktaID);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <h2>Create a Program Manager:</h2>

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
      <Button onClick={handleSumbit}>Submit</Button>
    </div>
  );
};

export default AcctMgrForm;
