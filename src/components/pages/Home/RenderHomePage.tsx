import React from 'react';

import { useSelector } from 'react-redux';

import { Redirect, useHistory } from 'react-router-dom';

import DefaultHomePage from './components/DefaultHomePage';

import styles from '../../../styles/pages/home.module.css';

function RenderHomePage(props) {
  const currentUser = useSelector(state => state.user.currentUser);

  const history = useHistory();

  switch (currentUser.role) {
    case 'admin':
      return <Redirect to="/admin" />;
    case 'pending':
      return <h1>Please contact an admin to get a role </h1>;
    default:
      return <DefaultHomePage />;
  }
}

export default RenderHomePage;
