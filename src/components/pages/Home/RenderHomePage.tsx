import React from 'react';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div>
      <h1>
        Hi {userInfo.name} Welcome to the Family Promise Rental Assistance
        Program
      </h1>
      <div>
        <p>T</p>
        <p>
          <button onClick={() => authService.logout()}>Logout</button>
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
