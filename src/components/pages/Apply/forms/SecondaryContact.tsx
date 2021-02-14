import React from 'react';

import { Form, Input } from 'antd';

export default function SecondaryContact({ formValues, setFormValues }) {
  return (
    <>
      {formValues.role === 'tenant' ? (
        <LandlordInfoForm formValues={formValues} />
      ) : (
        <TenantInfoForm formValues={formValues} />
      )}
    </>
  );
}

const TenantInfoForm = ({ formValues }) => {
  return (
    <div>
      <h2>Tenant info (optional)</h2>
      <h4>
        This will help us contact your tenant once you've been approved for
        Rental Assistance
      </h4>

      <Form.Item
        initialValue={formValues.tenantName}
        label="Name"
        name="tenantName"
      >
        <Input
          name="tenantName"
          placeholder="Bruce Wayne"
          value={formValues.tenantName}
        />
      </Form.Item>

      <Form.Item
        initialValue={formValues.tenantEmail}
        label="Email"
        name="tenantEmail"
      >
        <Input type="email" placeholder="wayne@gmail.com" name="tenantEmail" />
      </Form.Item>

      <Form.Item
        initialValue={formValues.tenantPhoneNumber}
        label="Phone number"
        name="tenantPhoneNumber"
      >
        <Input placeholder="(111)-111-1111" name="tenantPhoneNumber" />
      </Form.Item>
    </div>
  );
};

const LandlordInfoForm = ({ formValues }) => {
  return (
    <div>
      <h2>Landlord info (optional)</h2>
      <h4>
        This will help us contact your landlord once you've been approved for
        Rental Assistance
      </h4>

      <Form.Item
        initialValue={formValues.landlordName}
        label="Name"
        name="landlordName"
      >
        <Input
          name="landlordName"
          placeholder="Bruce Wayne"
          value={formValues.landlordName}
        />
      </Form.Item>

      <Form.Item
        initialValue={formValues.landlordEmail}
        label="Email"
        name="landlordEmail"
      >
        <Input
          type="email"
          placeholder="wayne@gmail.com"
          name="landlordEmail"
        />
      </Form.Item>

      <Form.Item
        initialValue={formValues.landlordPhoneNumber}
        label="Phone number"
        name="landlordPhoneNumber"
      >
        <Input placeholder="(111)-111-1111" name="landlordPhoneNumber" />
      </Form.Item>
    </div>
  );
};
