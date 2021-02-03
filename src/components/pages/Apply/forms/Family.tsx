import React from 'react';

import { InputNumber } from 'antd';

import { Form, Input } from 'antd';

export default function Family({ formValues }) {
  return (
    <div>
      <h2>Housing and Income</h2>
      <Form.Item
        name="familySize"
        initialValue={formValues.familySize}
        label="Family Size"
        required
        rules={[{ required: true, message: 'required' }]}
      >
        <Input
          style={{ width: '50%' }}
          type="number"
          name="familySize"
          value={formValues.familySize}
          min={1}
          max={20}
        />
      </Form.Item>
      <Form.Item
        name="beds"
        initialValue={formValues.beds}
        label="Number of bedrooms"
        rules={[{ required: true, message: 'required' }]}
      >
        <Input
          style={{ width: '50%' }}
          type="number"
          name="beds"
          value={formValues.beds}
          min={1}
          max={20}
        />
      </Form.Item>
      <Form.Item
        name="income"
        label="Monthly Income"
        rules={[{ required: true, message: 'required' }]}
      >
        <InputNumber
          style={{ width: '50%' }}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          value={formValues.income}
          min={0}
        />
      </Form.Item>
    </div>
  );
}
