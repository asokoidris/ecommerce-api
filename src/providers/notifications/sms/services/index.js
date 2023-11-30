import keys from '../../../../config/keys';
import sendTermiiMessage from './termii';

const { NODE_ENV } = keys;

const sendSms = async (payload) => {
  if (NODE_ENV === 'test') {
    logger.info('TEST: SMS sent');
    return true;
  }

  await sendTermiiMessage(payload);

  return true;
};

export default sendSms;
