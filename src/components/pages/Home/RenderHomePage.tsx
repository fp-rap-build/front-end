import React from 'react';

import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import DefaultHomePage from './components/DefaultHomePage';

function RenderHomePage(props) {
  const currentUser = useSelector(state => state.user.currentUser);

  switch (currentUser.role) {
    case 'admin':
      return <Redirect to="/admin" />;
    default:
      return <DefaultHomePage />;
  }
}

export default RenderHomePage;
