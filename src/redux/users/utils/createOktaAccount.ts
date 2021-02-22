import axios from 'axios';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

const okta_register_url =
  'https://dev-79515564.okta.com/api/v1/registration/reg4nxrwnAoXBkKJ75d6/register';
const okta_activate_url = 'https://dev-79515564.okta.com/api/v1/authn';

const createOktaAccount = async user => {
  const { firstName, lastName, email, role } = user;

  const oktaObj = {
    email: email,
    //Default password for new Acct Mgr's
    password: 'familypromise',
    firstName: firstName,
    lastName: lastName,
  };

  const newUser = {
    id: '',
    email: email,
    firstName: firstName,
    lastName: lastName,
    role: role,
  };

  try {
    //POST to registration URL - returning activation token
    const activationToken = await axios
      .post(okta_register_url, { userProfile: oktaObj })
      .then(res => {
        console.log(res.data);
        return res.data.activationToken;
      });
    //POST to activation url w/ activation token from registration
    //Returns our users - ID -- user is succesfully created

    const oktaID = await axios
      .post(okta_activate_url, { token: activationToken })
      .then(res => {
        console.log(res.data);
        return res.data._embedded.user.id;
      });

    newUser.id = oktaID;
    //Post new user to app's DB
    await axiosWithAuth().post('/user', newUser);
    return `Succesfully created User ${firstName} ${lastName}`;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export default createOktaAccount;
