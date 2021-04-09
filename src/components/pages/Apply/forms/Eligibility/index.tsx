import { useState } from 'react';
//Components
import BasicInformation from './BasicInformation';
import HouseholdInformation from './HouseholdInformation';
import AdditionalInformation from './AdditionalInformation';
//UI
import { Divider, Button } from 'antd';

export default function Eligibility({ formValues, setFormValues }) {
  const { role } = formValues;

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

  //This prop drilling is turning into a pain
  const props = {
    formValues,
    setFormValues,
    role,
    onRoleChange,
    onChange,
    handleCheckBoxChange,
  };

  return (
    <div>
      <BasicInformation {...props} />
      <Divider />
      <HouseholdInformation {...props} />
      <Divider />
      <AdditionalInformation {...props} />
    </div>
  );
}
