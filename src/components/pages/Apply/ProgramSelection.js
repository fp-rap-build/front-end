import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Typography } from 'antd';

const { Title } = Typography;

const dsBaseUrl = process.env.REACT_APP_DS_API_URI;

const ProgramSelection = ({ formValues }) => {
  //pass down props
  const { zipCode, familySize, monthlyIncome } = formValues;

  const checkPrograms = async () => {
    const queryString = `?zipcode=${zipCode}&family_size=${familySize}&income=${monthlyIncome}`;
    const callURL = dsBaseUrl + queryString;

    console.log(callURL);

    try {
      const res = await axios.post(callURL);
      console.log(res);
    } catch (err) {
      alert('error from DS API');
      console.log(err);
    }
  };
  useEffect(() => {
    checkPrograms();
  }, []);

  return (
    <div>
      <Title level={2}>Programs You May Qualify For:</Title>
      <Typography>
        {zipCode}
        {' | '}
        {familySize}
        {' | '}
        {monthlyIncome}
      </Typography>
    </div>
  );
};

export default ProgramSelection;
