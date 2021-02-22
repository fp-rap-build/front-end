import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { logIn } from '../../../redux/users/userActions';
import styles from '../../../styles/pages/login.module.css';

export default function Index() {
  const dispatch = useDispatch();

  const history = useHistory();

  const onFinish = (values: any) => {
    dispatch(logIn(values, history));
  };

  return (
    <Form
      name="normal_login"
      className={styles.container}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <div className={styles.fields}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password?
        </a>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginButton}
          >
            Log in
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
