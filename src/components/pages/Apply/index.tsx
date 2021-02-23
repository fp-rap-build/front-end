import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Form } from 'antd';

import BasicInformation from './forms/BasicInformation';

import SecondaryContact from './forms/SecondaryContact';

import CreateAccount from './forms/CreateAccount';

import Button from 'antd/lib/button';

import styles from '../../../styles/pages/apply.module.css';
import { registerAndApply } from '../../../redux/users/userActions';

import emailjs, { init } from 'emailjs-com';

import { clearErrorMessage } from '../../../redux/users/userActions';

import { setErrorMessage } from '../../../redux/global/globalActions';

// const INITIAL_VALUES_DEV = {
//   firstName: faker.name.firstName(),
//   lastName: faker.name.lastName(),
//   email: faker.internet.email(),
//   password: '',
//   confirmPassword: '',
//   address: '3211 East Ave',
//   cityName: 'Erie',
//   zipCode: '16504',
//   state: 'Pennsylvania',
//   role: 'tenant',
//   familySize: 2,
//   beds: 4,
//   monthlyIncome: 1000,
//   tenantName: 'tenant',
//   tenantEmail: 'tenant@gmail.com',
//   tenantPhoneNumber: '111-222-3333',
//   landlordName: 'landlord',
//   landlordEmail: 'landlord@gmail.com',
//   landlordPhoneNumber: '111-222-3333',
// };

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
  monthlyIncome: 1000,
  tenantName: '',
  tenantEmail: '',
  landlordName: '',
  landlordEmail: '',
};

const finalStep = 2;

//initiating connection to email service

init(process.env.REACT_APP_EMAIL_USER_ID);

export default function Index() {
  const loading = useSelector(state => state.global.isLoading);

  const errorMessage = useSelector(state => state.user.errorMessage);

  const dispatch = useDispatch();

  const userName = useSelector(theState => theState.user.currentUser);

  const history = useHistory();
  const [step, setStep] = useState(0);

  const goForward = () => setStep(step + 1);

  const goBackwards = () => setStep(step - 1);

  const [formValues, setFormValues] = useState(INITIAL_VALUES_PROD);

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

    let name,
      email = null;

    if (formValues.role === 'tenant') {
      name = formValues.landlordName;
      email = formValues.landlordEmail;
    } else {
      name = formValues.tenantName;
      email = formValues.tenantEmail;
    }

    const emailPayload = {
      to_name: name,
      from_name: fullName,
      user_email: email,
      message:
        'Enter whatever message J has for us to send plus an invite link',
    };

    sendEmail(emailPayload);
  };

  const fullName = userName.firstName + ' ' + userName.lastName;

  const sendEmail = emailPayload => {
    emailjs
      .send(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        'contact_form',
        emailPayload
      )
      .then(
        result => {
          console.log('success', result.status, result.text);
        },
        error => {
          console.log(error.text);
        }
      );
  };

  let props = { formValues, step, setFormValues, goBackwards, loading };

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
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      )}
    </div>
  );
};

const RenderForm = ({ step, formValues, setFormValues }) => {
  const props = { formValues, setFormValues };

  switch (step) {
    case 0:
      return <BasicInformation {...props} />;
    case 1:
      return <SecondaryContact {...props} />;
    case 2:
      return <CreateAccount {...props} />;
  }
};
