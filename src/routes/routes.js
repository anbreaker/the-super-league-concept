const { Router } = require('express');
const sgMail = require('@sendgrid/mail');

const router = Router();

router.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const contentHtml = `
    <h1>Información del Contacto:</h1>
    <ul>
      <li><b>Nombre:</b> ${name}</li>
      <li><b>Email :</b> ${email}</li>
      <li><b>Movil :</b> ${phone}</li>
    </ul>
    <p>
      <h2><b>Mensaje:</b></h2>
      ${message}
    </p>
  `;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'antunez19+sendgrid@gmail.com', // Change to your recipient
    from: `antunez19+sendgrid@gmail.com`, // Change to your verified sender
    subject: 'Correo Enviado desde the-super-league-concept',
    html: contentHtml,
  };

  sgMail
    .send(msg)
    .then(() => console.log('Email sent'))
    .catch((error) => {
      // Log friendly error
      console.error(error);

      if (error.response) {
        // Extract error msg
        const { message, code, response } = error;
        // Extract response msg
        const { headers, body } = response;
        console.error(body);
        console.error(headers, message, code, response, '<--------------- ERROR');
      }
    });

  res.redirect('/index.html');
});

module.exports = router;
