import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import LoadingComponent from '../../common/LoadingComponent';
import RenderHomePage from './RenderHomePage';
import { fetchCurrentUser } from '../../../redux/users/userActions';

function HomeContainer() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.global.isLoading);

  // eslint-disable-next-line

  useEffect(() => {
    // Set the current user in state

    dispatch(fetchCurrentUser());
  }, []);

  return (
    <>
      {isLoading && <LoadingComponent />}

      {!isLoading && <RenderHomePage />}
    </>
  );
}

export default HomeContainer;
