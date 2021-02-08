import axios from 'axios';
import axiosWithAuth from '../../../../api/axiosWithAuth';

const createAcctMgr = user => {
  const { firstName, lastName, email, password, organization, role } = user;

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `SSWS ${process.env.OKTA_API_TOKEN}`,
      Authorization: `SSWS 00FXBbAoTk_P49X4puP5s9JccgZ5pZthB6Gk4WvrEZ`,
    },
  };

  const oktaReqBody = {
    profile: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      login: email,
    },
    credentials: {
      password: {
        value: password,
      },
    },
  };

  let id = '';

  axios
    .post(
      'https://dev-79515564.okta.com/api/v1/users?activate=true',
      oktaReqBody,
      config
    )
    .then(res => {
      id = res.data.id;
    })
    .catch(err => {
      console.log(err);
    });

  console.log(id);
};

export default createAcctMgr;
