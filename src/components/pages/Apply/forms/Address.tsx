import React from 'react';

import { states } from '../../../../utils/data/states';

import { Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

export default function Address({ formValues, setFormValues }) {
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
        initialValue={formValues.cityName}
        label="City"
        name="cityName"
        rules={[{ required: true, message: 'City is required' }]}
      >
        <Input name="city" value={formValues.city} />
      </Form.Item>

      <Form.Item
        initialValue={formValues.address}
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Address is required' }]}
      >
        <Input name="address" />
      </Form.Item>
      <Form.Item
        initialValue={formValues.zipCode}
        label="Postal Code"
        name="zipCode"
        rules={[{ required: true, message: 'Postal is required' }]}
      >
        <Input name="zipCode" />
      </Form.Item>
      <Form.Item
        name="familySize"
        initialValue={formValues.familySize}
        label="Family Size"
        required
        rules={[{ required: true, message: 'required' }]}
      >
        <Input
          type="number"
          name="familySize"
          value={formValues.familySize}
          min={1}
          max={20}
        />
      </Form.Item>
      <Form.Item
        name="monthlyIncome"
        initialValue={formValues.monthlyIncome}
        label="Monthly Income"
        rules={[{ required: true, message: 'required' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          min={0}
        />
      </Form.Item>
    </div>
  );
}
