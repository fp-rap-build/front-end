import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Form } from 'antd';

import Address from './forms/Address';

import Landlord from './forms/Landlord';

import Button from 'antd/lib/button';

import styles from '../../../styles/pages/apply.module.css';
import Family from './forms/Family';
import { setCurrentUserStatic } from '../../../redux/users/userActions';

import emailjs, { init } from 'emailjs-com';
import useSelection from 'antd/lib/table/hooks/useSelection';

init('user_zfW4LQVBXyGr4lWRUgfZE');
const INITIAL_VALUES_DEV = {
  address: '3211 East Ave',
  city: 'Erie',
  zipCode: '16504',
  state: 'Pennsylvania',
  role: 'tenant',
  familySize: 2,
  beds: 4,
  income: 1000,
  tenantName: 'tenant',
  tenantEmail: 'tenant@gmail.com',
  tenantPhoneNumber: '111-222-3333',
  landlordName: 'landlord',
  landlordEmail: 'landlord@gmail.com',
  landlordPhoneNumber: '111-222-3333',
};

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

  const userName = useSelector(theState => theState.user.currentUser);

  const history = useHistory();
  const [step, setStep] = useState(0);

  const goForward = () => setStep(step + 1);

  const goBackwards = () => setStep(step - 1);

  const [formValues, setFormValues] = useState(INITIAL_VALUES_DEV);

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      ...formValues,
      isRequestingAssistance: true,
    };

    let name,
      email = null;

    if (user.role == 'tenant') {
      name = user.landlordName;
      email = user.landlordEmail;
    } else {
      name = user.tenantName;
      email = user.tenantEmail;
    }

    const emailPayload = {
      to_name: name,
      from_name: fullName,
      user_email: email,
      message:
        'Enter whatever message J has for us to send plus an invite link',
    };

    sendEmail(emailPayload);

    // dispatch(setCurrentUserStatic(user, history));
  };

  const fullName = userName.firstName + ' ' + userName.lastName;

  const sendEmail = emailPayload => {
    emailjs.send('service_24af83w', 'contact_form', emailPayload).then(
      result => {
        console.log('success', result.status, result.text);
      },
      error => {
        console.log(error.text);
      }
    );
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
              style={{
                backgroundColor: '#198754',
                borderColor: '#198754',
              }}
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
