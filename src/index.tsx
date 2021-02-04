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

import { NotFoundPage } from './components/pages/NotFound';

import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';

import Admin from './components/pages/Admin';

import Apply from './components/pages/Apply';

import { config } from './utils/oktaConfig';
import store from './redux/store';
import { Provider } from 'react-redux';
import LoadingComponent from './components/common/LoadingComponent';

import PrivateRoute from './utils/auth/PrivateRoute';

import Layout from './components/Layout';
import RequestsTable from './components/pages/Admin/components/RequestsTable';

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

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Layout>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/implicit/callback" component={LoginCallback} />
          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <SecureRoute
            path="/"
            exact
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />
          {/* Any routes you need secured by role should be registered as PrivateRoutes */}

          <PrivateRoute path="/admin" roles={['admin']} component={Admin} />
          <PrivateRoute
            path="/requests"
            roles={['admin']}
            component={RequestsTable}
          />
          <PrivateRoute
            path="/apply"
            roles={['pending', 'tenant', 'landlord']}
            component={Apply}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </Security>
  );
}
