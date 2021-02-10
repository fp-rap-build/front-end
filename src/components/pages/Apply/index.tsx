import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Form } from 'antd';

import Address from './forms/Address';

import Landlord from './forms/Landlord';

import Button from 'antd/lib/button';

import styles from '../../../styles/pages/apply.module.css';
import Family from './forms/Family';
import { applyForRentalAssistance } from '../../../redux/users/userActions';
import { axiosWithAuth } from '../../../api';

const INITIAL_VALUES_PROD = {
  address: '3211 East Ave',
  cityName: 'Erie',
  zipCode: '16504',
  state: 'Pennsylvania',
  role: 'tenant',
  monthlyIncome: 100,
  familySize: 2,
};

export default function Index() {
  const loading = useSelector(state => state.global.isLoading);
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

  const handleSubmit = async () => {
    const user = {
      familySize: formValues.familySize,
      role: formValues.role,
      monthlyIncome: formValues.monthlyIncome,
      isRequestingAssistance: true,
    };

    const address = {
      address: formValues.address,
      cityName: formValues.cityName,
      zipCode: formValues.zipCode,
      state: formValues.state,
    };

    dispatch(applyForRentalAssistance(user, address, history));
  };

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        onChange={handleChange}
        onFinish={step == 0 ? handleSubmit : () => goForward()}
        className={styles.form}
      >
        <RenderForm
          step={step}
          formValues={formValues}
          setFormValues={setFormValues}
        />
        <div className={styles.formNavigation}>
          {step > 0 && <Button onClick={() => goBackwards()}>Previous</Button>}
          {step === 0 ? (
            <Button
              htmlType="submit"
              style={{ backgroundColor: '#198754', borderColor: '#198754' }}
              type="primary"
            >
              {loading ? 'Loading. . .' : 'Submit'}
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

const RenderForm = ({ step, formValues, setFormValues }) => {
  const props = { formValues, setFormValues };

  switch (step) {
    case 0:
      return <Address {...props} />;
  }
};
