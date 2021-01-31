import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderHomePage';
import { setCurrentUser } from '../../../redux/users/userActions';

function HomeContainer({ LoadingComponent }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.global.isLoading);
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  const fetchCurrentUser = () => {
    dispatch(setCurrentUser());
  };

  useEffect(() => {
    let isSubscribed = true;

    fetchCurrentUser();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoAuthService]);

  return (
    <>
      {isLoading && <LoadingComponent />}
      {authState.isAuthenticated && !isLoading && (
        <RenderHomePage userInfo={userInfo} authService={authService} />
      )}
    </>
  );
}

export default HomeContainer;
