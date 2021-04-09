import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Form } from 'antd';

import BasicInformation from './forms/Eligibility/BasicInformation';

import HouseholdInformation from './forms/Eligibility/HouseholdInformation';

import AdditionalInformation from './forms/Eligibility/AdditionalInformation';

import SecondaryContact from './forms/SecondaryContact';

import CreateAccount from './forms/CreateAccount';

import ProgramSelection from './forms/ProgramSelection';

import Button from 'antd/lib/button';

import styles from '../../../styles/pages/apply.module.css';

import { registerAndApply } from '../../../redux/users/userActions';

import { clearErrorMessage } from '../../../redux/users/userActions';

import { setErrorMessage } from '../../../redux/global/globalActions';

import faker from 'faker';

const INITIAL_VALUES_DEV = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'testpassword',
  confirmPassword: 'testpassword',
  address: '1211 test St',
  cityName: 'test',
  zipCode: 99205,
  state: 'Washington',
  role: 'tenant',
  familySize: 4,
  beds: 4,
  monthlyIncome: 1000,
  tenantName: 'tenant',
  tenantEmail: 'tenant@gmail.com',
  tenantPhoneNumber: '111-222-3333',
  landlordName: 'landlord',
  landlordEmail: 'landlord@gmail.com',
  landlordPhoneNumber: '111-222-3333',
  owed: 600,
  requested: 450,
  rent: 500,
  totalChildren: 2,
};

const INITIAL_VALUES_PROD = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  address: '',
  cityName: '',
  zipCode: '',
  state: '',
  role: '',
  familySize: 1,
  monthlyIncome: 0,
  tenantName: '',
  tenantEmail: '',
  landlordName: '',
  landlordEmail: '',
  unEmp90: false,
  foodWrkr: false,
};

const finalStep = 5;

export default function Index() {
  const loading = useSelector(state => state.global.isLoading);

  const errorMessage = useSelector(state => state.user.errorMessage);

  const dispatch = useDispatch();

  const history = useHistory();
  const [step, setStep] = useState(0);

  const goForward = () => setStep(step + 1);

  const goBackwards = () => setStep(step - 1);

  const [formValues, setFormValues] = useState(INITIAL_VALUES_DEV);

  const handleChange = e => {
    // Clean up any error message after the user types
    if (errorMessage) {
      dispatch(clearErrorMessage());
    }

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Break out of the submit if there are errors
    if (errorMessage) return;

    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      return dispatch(setErrorMessage('Passwords must match'));
    }

    if (formValues.password.length < 10) {
      return dispatch(
        setErrorMessage('Password must be at least 10 characters')
      );
    }

    dispatch(registerAndApply(formValues, history));
  };

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

  let props = {
    formValues,
    step,
    setFormValues,
    goBackwards,
    goForward,
    loading,
    onChange,
    onRoleChange,
    handleCheckBoxChange,
  };

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        onChange={handleChange}
        onFinish={step === finalStep ? handleSubmit : () => goForward()}
        className={styles.form}
      >
        <RenderForm {...props} />
        <FormNavigation {...props} />
      </Form>
    </div>
  );
}

const FormNavigation = ({ step, goBackwards, loading }) => {
  return (
    <div className={styles.formNavigation}>
      {step > 0 && <Button onClick={() => goBackwards()}>Previous</Button>}
      {step === finalStep ? (
        <Button
          htmlType="submit"
          style={{ backgroundColor: '#198754', borderColor: '#198754' }}
          type="primary"
        >
          {loading ? 'Loading. . .' : 'Submit'}
        </Button>
      ) : (
        <Button
          style={step == 3 ? { display: 'none' } : {}}
          type="primary"
          htmlType="submit"
        >
          Next
        </Button>
      )}
    </div>
  );
};

const RenderForm = props => {
  switch (props.step) {
    case 0:
      return <BasicInformation {...props} />;
    case 1:
      return <HouseholdInformation {...props} />;
    case 2:
      return <AdditionalInformation {...props} />;
    case 3:
      return <ProgramSelection {...props} />;
    case 4:
      return <SecondaryContact {...props} />;
    case 5:
      return <CreateAccount {...props} />;
  }
};
