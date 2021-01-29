import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderHomePage';
import { setCurrentUser } from '../../../redux/users/userActions';

function HomeContainer({ LoadingComponent }) {
  const dispatch = useDispatch();
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    console.log(
      JSON.parse(localStorage.getItem('okta-token-storage'))?.idToken?.value
    );

    dispatch(setCurrentUser());

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <RenderHomePage userInfo={userInfo} authService={authService} />
      )}
    </>
  );
}

export default HomeContainer;
