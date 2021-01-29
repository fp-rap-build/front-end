import React from 'react';

import { useSelector } from 'react-redux';

function RenderHomePage(props) {
  const { authService } = props;

  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <div>
      <h1>
        Hi {currentUser.firstName} Welcome to the Family Promise Rental
        Assistance Program
      </h1>
      <h1>your role is {currentUser.role} </h1>
      <div>
        <p>
          <button onClick={() => authService.logout()}>Logout</button>
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
