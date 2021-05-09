const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_TESTMODE } = process.env
const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN,
  testMode: MAILGUN_TESTMODE === 'true',
});

module.exports.sendEmail = ({
  from,
  to,
  cc,
  bcc,
  subject,
  text,
  inline,
  html,
  attachment,
}) =>
  new Promise((resolve, reject) => {
    const data = {
      from,
      to,
      cc,
      bcc,
      subject,
      text,
      inline,
      html,
      attachment,
    };
    // Remove empty values
    for (let key of Object.keys(data)) {
      if (!data[key]) delete data[key];
    }

    if (MAILGUN_TESTMODE && MAILGUN_TESTMODE !== 'true') {
      data.subject = '[' + data.to + '] ' + data.subject;
      data.to = MAILGUN_TESTMODE; // Force target
      delete data.cc;
      delete data.bcc;
    }

    if (mailgun) {
      mailgun.messages().send(data, function (error, body) {
        console.log('Sending email : ' + JSON.stringify(data) + ' Result=' + (body ? JSON.stringify(body) : error));
        if (error) {
          return reject(error)
        } else {
          return resolve(body)
        }
      })
    }
  })
