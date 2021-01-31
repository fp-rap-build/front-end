import React from 'react';
import { useHistory } from 'react-router-dom';

const LandLordHome = ({ currentUser }) => {
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
        Landlord features (from trello):
        <ul>
          <li>Submit name, contact info, property info, and tenant info</li>
          <li>Submit Request for rent assistance</li>
          <li>See status of Request</li>
          <li>See Requests for info from my tenants</li>
        </ul>
      </div>
      <p>
        {currentUser.isRequestingAssistance ? (
          <p>
            {' '}
            Current Application Status <span>{currentUser.requestStatus}</span>
          </p>
        ) : (
          <button onClick={routeToForm}>
            Apply for Rental Assistance Program
          </button>
        )}
      </p>
    </div>
  );
};

export default LandLordHome;
