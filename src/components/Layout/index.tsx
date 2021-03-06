// Place any components you want to persist accross all pages

import React from 'react';
import Zendesk from 'react-zendesk';
import Navbar from './components/Navbar';

const setting = {
  color: {
    theme: '#004477',
  },
  launcher: {
    chatLabel: {
      'en-US': 'Need Help?',
    },
  },
  contactForm: {
    fields: [
      { id: 'description', prefill: { '*': 'My pre-filled description' } },
    ],
  },
};

export default function index({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <div>
        <Zendesk zendeskKey={process.env.REACT_APP_ZENDESK_KEY} {...setting} />
      </div>
    </div>
  );
}
