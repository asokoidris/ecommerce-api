import keys from '../../../../config/keys';
import sendMailtrap from './sendmaitrap';
import sendPlus from './sendpulse';

const { NODE_ENV } = keys;

const sendmail = async (payload) => {
  if (NODE_ENV === 'test') {
    logger.info('TEST: Email sent');
    return true;
  }

  if (NODE_ENV === 'production') {
    logger.info('PRODUCTION: Email sent');
    await sendPlus(payload);
    return true;
  }

  await sendMailtrap(payload);

  return true;
};

export default sendmail;
