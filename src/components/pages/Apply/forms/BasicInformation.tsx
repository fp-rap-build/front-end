import React from 'react';

import { states } from '../../../../utils/data/states';

import { Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

export default function BasicInformation({ formValues, setFormValues }) {
  function onChange(value) {
    setFormValues({ ...formValues, state: value });
  }

  const onRoleChange = value => {
    setFormValues({ ...formValues, role: value });
  };

  return (
    <div>
      <h2>Basic Information</h2>
      <Form.Item
        hasFeedback
        initialValue={formValues.role}
        label="Are you a Landlord or Tenant?"
        name="role"
        rules={[{ required: true, message: 'required' }]}
      >
        <Select
          onChange={onRoleChange}
          placeholder="Are you a Landlord or Tenant"
        >
          <Option value="tenant">Tenant</Option>
          <Option value="landlord">Landlord</Option>
        </Select>
      </Form.Item>

      <Form.Item
        hasFeedback
        initialValue={formValues.state}
        label="State"
        name="state"
        rules={[{ required: true, message: 'State is required' }]}
      >
        <Select
          onChange={onChange}
          showSearch
          placeholder="Select a state"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {states.map(state => (
            <Option value={state}>{state}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        hasFeedback
        initialValue={formValues.cityName}
        label="City"
        name="cityName"
        rules={[
          { required: true, message: 'City is required' },
          {
            pattern: RegExp(/^[a-zA-Z\s]*$/),
            message: 'Enter a valid City Name',
          },
        ]}
      >
        <Input name="cityName" value={formValues.city} />
      </Form.Item>

      <Form.Item
        hasFeedback
        initialValue={formValues.address}
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            min: 3,
            message: 'Address is required',
          },
        ]}
      >
        <Input name="address" />
      </Form.Item>
      <Form.Item
        hasFeedback
        initialValue={formValues.zipCode}
        label="Postal Code"
        name="zipCode"
        rules={[
          {
            type: 'number',
            required: true,
            message: 'Postal code is required',
          },
          {
            required: true,
            pattern: RegExp(/^\d{5}$/),
            message: 'Invalid postal code',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} name="zipCode" />
      </Form.Item>
      <Form.Item
        name="familySize"
        initialValue={formValues.familySize}
        label=" Residents"
        required
        hasFeedback
        rules={[
          {
            required: true,
            pattern: RegExp(/^([1-9][0-9]?)\s*$/),
            message: 'Invalid number of residents',
          },
        ]}
      >
        <Input
          style={{ width: '100%' }}
          name="familySize"
          value={formValues.familySize}
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="monthlyIncome"
        initialValue={formValues.monthlyIncome}
        label="Monthly Income"
        rules={[
          {
            required: true,
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid income',
          },
        ]}
      >
        <Input name="monthlyIncome" style={{ width: '100%' }} />
      </Form.Item>
    </div>
  );
}
