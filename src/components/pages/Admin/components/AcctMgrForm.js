import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

import createAcctMgr from '../utils/createAcctManager';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const INITIAL_VALUES_DEV = {
  firstName: 'Program',
  lastName: 'Manager',
  email: 'pm@gmail.com',
  password: 'familypromise',
  organization: 'Family Promise of Spokane',
  role: 'account manager',
};

const AcctMgrForm = () => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES_DEV);
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

  const handleSumbit = e => {
    createAcctMgr(INITIAL_VALUES_DEV);
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

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
        />
      </Form.Item>

      <Form.Item
        initialValue={formValues.lastName}
        label="Last Name"
        name="lastName"
      >
        <Input name="lastName" placeholder="Doe" value={formValues.lastName} />
      </Form.Item>

      <Form.Item initialValue={formValues.email} label="E-mail" name="email">
        <Input
          name="email"
          placeholder="example@mail.com"
          value={formValues.email}
        />
      </Form.Item>
      <Button onClick={handleSumbit}>Submit</Button>

      {/* {orgs.map(org => {
        return (
          <div> {org.organization} </div>
        )
      })} */}
    </div>
  );
};

export default AcctMgrForm;
