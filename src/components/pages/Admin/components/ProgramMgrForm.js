import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Select, Button, message } from 'antd';
import styles from '../../../../styles/pages/create.module.css';

import createProgramMgr from '../utils/createProgramMgr';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const INITIAL_VALUES = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: 'programManager',
  organizationId: 1,
  // organization: 'Family Promise of Spokane',
  // role: 'account manager',
};

const ProgramMgrForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
    setFormValues({ ...formValues, organizationId: value });
  };

  const handleSumbit = async e => {
    setLoading(true);
    try {
      await createProgramMgr(formValues);
      setFormValues(INITIAL_VALUES);
      message.success('Successfully created program manager');
    } catch (error) {
      message.error('Failed to create program manager');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create a Program Manager:</h2>
      <Form onFinish={handleSumbit} className={styles.form} layout="vertical">
        <Form.Item
          initialValue={formValues.firstName}
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'required' }]}
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
          rules={[{ required: true, message: 'required' }]}
        >
          <Input
            name="lastName"
            placeholder="Doe"
            value={formValues.lastName}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.email}
          rules={[{ required: true, message: 'required' }]}
          label="E-mail"
          name="email"
        >
          <Input
            name="email"
            placeholder="example@mail.com"
            value={formValues.email}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.password}
          rules={[{ required: true, message: 'required' }]}
          label="Password"
          name="password"
        >
          <Input
            name="password"
            value={formValues.password}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.organization}
          rules={[{ required: true, message: 'required' }]}
          label="Organization"
          name="organization"
        >
          <Select onChange={onOrgChange} placeholder="Select an Organization">
            {orgs.map(org => (
              <Select.Option value={org.id}>{org.organization}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {loading ? 'Creating program manager..' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
};

export default ProgramMgrForm;
