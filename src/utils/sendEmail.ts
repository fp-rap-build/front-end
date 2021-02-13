import emailjs from 'emailjs-com';

const sendEmail = emailPayload => {
  emailjs.send('service_24af83w', 'contact_form', emailPayload).then(
    result => {
      console.log('success', result.status, result.text);
    },
    error => {
      console.log(error.text);
    }
  );
};

export default sendEmail;
