import axios from 'axios';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

//This component is working and it returns the Okta User ID
const okta_register_url =
  'https://dev-79515564.okta.com/api/v1/registration/reg4nxrwnAoXBkKJ75d6/register';
const okta_activate_url = 'https://dev-79515564.okta.com/api/v1/authn';

const createAcctMgr = async user => {
  const { firstName, lastName, email, password, role, organization_id } = user;

  const uktaObj = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };

  const newAcctMgr = {
    id: '',
    email: email,
    firstName: firstName,
    lastName: lastName,
    role: role,
    organization_id: organization_id,
  };

  try {
    const activationToken = await axios
      .post(okta_register_url, { userProfile: uktaObj })
      .then(res => res.data.activationToken);
    const oktaID = await axios
      .post(okta_activate_url, { token: activationToken })
      .then(res => res.data._embedded.user.id);
    newAcctMgr.id = oktaID;
    const createdMgr = await axiosWithAuth().post('/user', newAcctMgr);
    return createdMgr;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export default createAcctMgr;
