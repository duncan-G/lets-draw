const nodeMailer = require('nodemailer');

function ResponseMessage(data, err) {
  return {
    error: ErrorMessage(err),
    data: data || ''
  };
}

function ErrorMessage(err) {
  return err
    ? {
        message: err.message || 'Something went wrong!',
        type: err.name || 'UnknownError'
      }
    : '';
}

function sendMail(to, subject, text) {
  const from = process.env.SUPPORT_EMAIL;

  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: from,
      pass: process.env.SUPPORT_PASSWORD
    }
  });

  const mailOptions = {
    from,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, function(err, response) {
    if (err) {
      throw err;
    } else {
      return response;
    }
  });
}

module.exports = {
  ResponseMessage,
  sendMail
};
