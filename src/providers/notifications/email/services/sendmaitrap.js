import nodemailer from 'nodemailer';
import keys from '../../../../config/keys';
import * as emailTemplates from '../templates';

const { HOST, PORT, USERNAME, PASSWORD, SENDER } =
  keys.NOTIFICATION.EMAIL.MAIL_TRAP;

const transporter = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  auth: {
    user: USERNAME,
    pass: PASSWORD,
  },
});

const getEmailTemplate = (template) =>
  emailTemplates[template] || emailTemplates.welcome;

const configureEmail = (to, subject, body, templateData, template) => ({
  from: SENDER,
  to,
  subject,
  text: body,
  html: getEmailTemplate(template)(templateData),
});

const sendMailTrap = async (payload) => {
  const { to, name, subject, body, url, cta, emailPayload, template, alias } =
    payload;

  try {
    const emailConfig = configureEmail(
      to,
      subject,
      body,
      { name, body, url, cta, emailPayload, alias },
      template
    );
    await transporter.sendMail(emailConfig);

    console.log(`sendMailTrap -> info: Mailtrap email sent to ${to}`);
    return true;
  } catch (error) {
    console.log(
      `sendMailTrap -> error: Failed to send email to ${to}. Reason: ${error.message}`
    );
    return false;
  }
};

export default sendMailTrap;
