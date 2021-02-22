import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import 'antd/dist/antd.less';

import './styles/global.css';

import { NotFoundPage } from './components/pages/NotFound';

import LoginPage from './components/pages/Login';
import { HomePage } from './components/pages/Home';

import Admin from './components/pages/Admin';

import LandingPage from './components/pages/Landing';

import Apply from './components/pages/Apply';

import { config } from './utils/oktaConfig';
import store from './redux/store';
import { Provider } from 'react-redux';
import LoadingComponent from './components/common/LoadingComponent';

import PrivateRoute from './utils/auth/PrivateRoute';

import Layout from './components/Layout';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <RAP />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function RAP() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  return (
    <Layout>
      <Switch>
        <Route path="/landing" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/apply" exact component={Apply} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <PrivateRoute exact path="/" component={HomePage} />
        {/* Any routes you need secured by role should be registered as PrivateRoutes */}
        <PrivateRoute path="/admin" roles={['admin']} component={Admin} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}
