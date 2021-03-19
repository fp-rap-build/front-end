import { Checkbox, Form, Input, InputNumber, Select } from 'antd';
import React from 'react';
import { states } from '../../../../utils/data/states';

const { Option } = Select;

export default function BasicInformation({ formValues, setFormValues }) {
  const { role } = formValues;

  const tenantCheckboxIntroMessage =
    'Please place a checkmark next to all of the statements below that are true for you and/or somebody in your household:';

  const landlordCheckboxIntroMessage =
    'Please place a checkmark next to all of the statements below that are true for your tenant:';

  const tenantInformationIntroMessage =
    'Please answer the following questions about your household';

  const landlordInformationIntroMessage =
    "Please answer the following questions about your tenant's household to the best of your knowledge";

  function onChange(value) {
    setFormValues({ ...formValues, state: value });
  }

  const onRoleChange = value => {
    setFormValues({ ...formValues, role: value });
  };

  const handleCheckBoxChange = e => {
    e.stopPropagation();

    const { name, checked } = e.target;

    setFormValues({ ...formValues, [name]: checked });
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
        extra={
          formValues.role === 'landlord'
            ? 'Please enter your own address information below'
            : null
        }
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
          { required: true, min: 3, message: 'City is required' },
          {
            pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
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
          { required: true, message: 'Address is required' },
          {
            pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
            message: 'Enter a valid City Name',
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
        label={
          formValues.role === 'landlord'
            ? 'Tenants Monthly Income'
            : 'Monthly Income'
        }
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

      <Form.Item
        hasFeedback
        name="rent"
        initialValue={formValues.rent}
        label={
          formValues.role === 'landlord'
            ? 'Tenants Monthly Rent Amount'
            : 'Monthly Rent'
        }
        rules={[
          {
            required: true,
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid rent',
          },
        ]}
      >
        <Input name="rent" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="owed"
        initialValue={formValues.rent}
        label={
          formValues.role === 'landlord'
            ? 'Tenants Total Amount Owed'
            : 'Total owed'
        }
        rules={[
          {
            required: true,
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid total',
          },
        ]}
      >
        <Input name="owed" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="requested"
        initialValue={formValues.rent}
        label={
          formValues.role === 'landlord'
            ? 'Tenants Total Amount Requested'
            : 'Total requested'
        }
        rules={[
          {
            required: true,
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid total',
          },
        ]}
      >
        <Input name="requested" style={{ width: '100%' }} />
      </Form.Item>

      <h4>
        {role === 'landlord'
          ? landlordCheckboxIntroMessage
          : tenantCheckboxIntroMessage}
      </h4>
      <hr></hr>
      <Form.Item>
        <Checkbox
          checked={formValues.minorGuest}
          name="minorGuest"
          onChange={handleCheckBoxChange}
        >
          Household has at least one minor (17 or younger) or at least one
          person is pregnant?
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox name="unEmp90" onChange={handleCheckBoxChange}>
          Been unemployed for 90+ Days?
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={formValues.foodWrkr}
          name="foodWrkr"
          onChange={handleCheckBoxChange}
        >
          At least one person in the household worked in the food service
          industry at any time since January 1, 2020?
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          checked={formValues.covidFH}
          name="covidFH"
          onChange={handleCheckBoxChange}
        >
          Have been impacted by Covid.
        </Checkbox>
      </Form.Item>
      <hr></hr>
    </div>
  );
}
