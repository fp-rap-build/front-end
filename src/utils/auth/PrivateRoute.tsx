import React from 'react';
import { SecureRoute } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, roles = [], ...rest }) => {
  const user = useSelector(state => state.user.currentUser);

  if (!roles.includes(user.role)) {
    return <Redirect to="/" />;
  }

  return <SecureRoute {...rest} component={Component} />;
};

export default PrivateRoute;
