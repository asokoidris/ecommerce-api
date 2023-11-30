import { TERMII_API_KEY, TERMII_SEND_MESSAGE_URL } from '../config/secret';
import HttpHelper from '../utils/http-helper';

const Termii = {
  sendMessage(data) {
    const params = {
      to: data.phoneNumber,
      from: 'zacrac',
      sms: data.message,
      type: 'plain',
      api_key: TERMII_API_KEY,
      channel: 'generic',
    };
    return HttpHelper.post(TERMII_SEND_MESSAGE_URL, params);
  },
};
export default Termii;
