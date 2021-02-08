import axios from 'axios';

//This component is working and it returns the Okta User ID
const okta_register_url =
  'https://dev-79515564.okta.com/api/v1/registration/reg4nxrwnAoXBkKJ75d6/register';
const okta_activate_url = 'https://dev-79515564.okta.com/api/v1/authn';

const createAcctMgr = async user => {
  const { firstName, lastName, email, password } = user;

  const userObj = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };

  try {
    const activationToken = await axios
      .post(okta_register_url, { userProfile: userObj })
      .then(res => res.data.activationToken);
    const response = await axios
      .post(okta_activate_url, { token: activationToken })
      .then(res => res.data);
    console.log(response._embedded.user.id);
    return response._embedded.user.id;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export default createAcctMgr;
