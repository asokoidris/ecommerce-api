import HelperFunctions from '../../../../utils/helperFunctions';
import keys from '../../../../config/keys';

const sendTermiiMessage = async (payload) => {
  const { API_KEY, ENDPOINT, FROM } = keys.NOTIFICATION.SMS.TERMII;
  const { to, body } = payload;

  const isDND = false; //NOTE: set to true if we have a DND list

  const channel = isDND ? 'dnd' : 'generic';
  const data = {
    api_key: API_KEY,
    to: to,
    from: FROM,
    sms: body,
    type: 'plain',
    channel: channel,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await HelperFunctions.sendRequest(
    ENDPOINT,
    'POST',
    headers,
    data
  );

  if (response.status !== 200) {
    console.error('sendTermiiMessage -> error: ', response.message);
    return false;
  }

  console.log('sendTermiiMessage -> info: SMS sent');
  return true;
};

export default sendTermiiMessage;
