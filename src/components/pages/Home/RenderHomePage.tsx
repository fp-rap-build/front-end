import React from 'react';

import { useSelector } from 'react-redux';

import { Redirect, useHistory } from 'react-router-dom';

import TenantHome from './components/TenantHome';
import LandlordHome from './components/LandlordHome';
import styles from '../../../styles/pages/home.module.css';

function RenderHomePage(props) {
  const { authService } = props;

  const currentUser = useSelector(state => state.user.currentUser);

  const history = useHistory();

  //Evt Handler to send to form
  const routeToForm = () => {
    history.push('/request');
  };

  switch (currentUser.role) {
    case 'admin':
      return <Redirect to="/admin" />;
    case 'tenant':
      return <TenantHome currentUser={currentUser} />;
  }

  //Add landlordHome to switch and ditch catch-all return here??
  return <LandlordHome currentUser={currentUser} />;
}
export default RenderHomePage;
