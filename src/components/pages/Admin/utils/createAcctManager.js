import React, { useState } from 'react';
import axios from 'axios';

// Create New User in OKTA -- returns a fat user obj

//Pull these values from form
const reqBody = {
  profile: {
    firstName: 'Isaac',
    lastName: 'Brock',
    email: 'isaac.brock@example.com',
    login: 'isaac.brock@example.com',
  },
  credentials: {
    password: {
      value: 'testpassword',
    },
  },
};

const createProgramMgr = user => {
  const { firstName, lastName, email, password, organization } = user;

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `SSWS ${process.env.OKTA_API_TOKEN}`,
    },
  };

  const oktaReqBody = {
    profile: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      login: email,
    },
    credentials: {
      password: {
        value: password,
      },
    },
  };

  let id = '';

  axios
    .post(
      'https://dev-79515564.okta.com/api/v1/users?activate=true',
      oktaReqBody,
      config
    )
    .then(res => {
      id = res.data.id;
    })
    .catch(err => {
      console.log(err);
    });

  //Check to see if ID exists return all orgs - if not there make a new one
  //Promise chaining should take care of this
};
