import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Form } from 'antd';

import Address from './forms/Address';

import Landlord from './forms/Landlord';

import Button from 'antd/lib/button';

import styles from '../../../styles/pages/apply.module.css';
import Family from './forms/Family';
import { setCurrentUserStatic } from '../../../redux/users/userActions';

// const INITIAL_VALUES_DEV = {
//   address: '3211 East Ave',
//   city: 'Erie',
//   zipCode: '16504',
//   state: 'Pennsylvania',
//   role: 'tenant',
//   familySize: 2,
//   beds: 4,
//   income: 1000,
//   tenantName: 'tenant',
//   tenantEmail: 'tenant@gmail.com',
//   tenantPhoneNumber: '111-222-3333',
//   landlordName: 'landlord',
//   landlordEmail: 'landlord@gmail.com',
//   landlordPhoneNumber: '111-222-3333',
// };

const INITIAL_VALUES_PROD = {
  address: '',
  city: '',
  zipCode: '',
  state: '',
  role: '',
  familySize: '',
  beds: '',
  income: '',
  tenantName: '',
  tenantEmail: '',
  tenantPhoneNumber: '',
  landlordName: '',
  landlordEmail: '',
  landlordPhoneNumber: '',
};

export default function Index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(0);

  const goForward = () => setStep(step + 1);

  const goBackwards = () => setStep(step - 1);

  const [formValues, setFormValues] = useState(INITIAL_VALUES_PROD);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  const handleSubmit = e => {
    const user = {
      ...formValues,
      isRequestingAssistance: true,
    };

    dispatch(setCurrentUserStatic(user, history));
  };

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        onChange={handleChange}
        onFinish={() => goForward()}
        className={styles.form}
      >
        <div>
          {step > 0 && <Button onClick={() => goBackwards()}>Previous</Button>}
          {step === 2 ? (
            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: '#198754', borderColor: '#198754' }}
              type="primary"
            >
              Submit
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
        </div>

        <RenderForm
          step={step}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      </Form>
    </div>
  );
}

const RenderForm = ({ step, formValues, setFormValues }) => {
  const props = { formValues, setFormValues };

  switch (step) {
    case 0:
      return <Address {...props} />;
    case 1:
      return <Family {...props} />;
    case 2:
      return <Landlord {...props} />;
  }
};
