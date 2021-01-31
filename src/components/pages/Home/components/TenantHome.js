import React from 'react';
import { useHistory } from 'react-router-dom';

const TenantHome = ({ currentUser }) => {
  const history = useHistory();

  //Evt Handler to send to form
  const routeToForm = () => {
    history.push('/request');
  };

  return (
    <div>
      <h1>
        Hi {currentUser.firstName}, Welcome to the Family Promise Rental
        Assistance Program
      </h1>
      <div>your role is {currentUser.role} </div>
      <div>
        <h2>About the Rental Assitance Program</h2>
        <p>
          Insert Blurb about RAP here: Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur.{' '}
        </p>
      </div>
      <div>
        <p>
          {currentUser.isRequestingAssistance ? (
            <p>
              {' '}
              Current Application Status{' '}
              <span>{currentUser.requestStatus}</span>
            </p>
          ) : (
            <button onClick={routeToForm}>
              Apply for Rental Assistance Program
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default TenantHome;
