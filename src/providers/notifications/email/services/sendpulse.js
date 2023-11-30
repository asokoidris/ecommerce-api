const Buffer = require('buffer').Buffer;
import axios from 'axios';
import keys from '../../../../config/keys';
import * as emailTemplates from '../templates';
import { MAIL_OPTIONS } from '../../../../utils/constant/options';
import EmailRepo from '../../../../repository/emailRepo';
import HelperFunctions from '../../../../utils/helperFunctions';

//NOTE: sendplus credentials
const {
  ID,
  SECRET,
  GRANT_TYPE,
  AUTHENTICATION_URL,
  SEND_EMAIL_URL,
  FROM,
  FROM_NAME,
} = keys.NOTIFICATION.EMAIL.SEND_PULSE;

const getSendPlusToken = async () => {
  try {
    const sendplusToken = await EmailRepo.findByEmailByNotificationType(
      MAIL_OPTIONS.SEND_PULSE
    );

    if (sendplusToken) {
      const { expiresInSeconds, updatedAt } = sendplusToken;
      const currentTime = new Date().getTime();
      const tokenExpirationTime =
        new Date(updatedAt).getTime() + expiresInSeconds * 1000;

      if (currentTime < tokenExpirationTime) {
        return {
          access_token: sendplusToken.accessToken,
          tokenType: sendplusToken.tokenType || 'Bearer',
        };
      }
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await HelperFunctions.sendRequest(
      AUTHENTICATION_URL,
      'POST',
      headers,
      {
        grant_type: GRANT_TYPE,
        client_id: ID,
        client_secret: SECRET,
      }
    );

    const { access_token, expires_in, token_type } = response.data;

    const updateEmailModel = await EmailRepo.updateEmailVerification(
      { notificationType: MAIL_OPTIONS.SEND_PULSE },
      {
        accessToken: access_token,
        expiresInSeconds: expires_in,
        grantType: GRANT_TYPE,
        tokenType: token_type,
        updatedAt: new Date(),
      }
    );

    if (!updateEmailModel)
      await EmailRepo.create({
        notificationType: MAIL_OPTIONS.SEND_PULSE,
        accessToken: access_token,
        expiresInSeconds: expires_in,
        grantType: GRANT_TYPE,
        tokenType: token_type,
        updatedAt: new Date(),
      });

    return {
      access_token,
      tokenType: token_type || 'Bearer',
    };
  } catch (err) {
    logger.error(`getSendplusToken -> error: Sendplus error: ${err.message}`);
    return false;
  }
};

const sendPlus = async (payload) => {
  const { to, name, subject, body, url, cta, emailPayload, template } = payload;
  logger.info(`sendplus -> info: Sendplus email sending to ${to}`);
  let emailTemplate;
  try {
    emailTemplate = emailTemplates[template];
  } catch (err) {
    emailTemplate = emailTemplates.welcome;
  }

  try {
    const token = await getSendPlusToken();
    let emailHTML = emailTemplate({ name, body, url, cta, emailPayload });
    let emailHTMLBase64 = Buffer.from(emailHTML, 'utf8').toString('base64');

    await axios.post(
      SEND_EMAIL_URL,
      {
        email: {
          html: emailHTMLBase64,
          text: body,
          subject: subject,
          from: {
            name,
            fromName: FROM_NAME,
            email: FROM,
          },
          to: [
            {
              name,
              email: to,
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `${token.tokenType} ${token.access_token}`,
        },
      }
    );

    logger.info(`sendplus -> info: Sendplus email sent to ${to}`);
  } catch (error) {
    logger.error(`sendplus -> error: ${error.message}`);
    return false;
  }

  return true;
};

export default sendPlus;
