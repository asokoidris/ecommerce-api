import CustomError from '../middleware/error/custom.error';
import Termii from './termii';

const Message = {
  /**
   * to: phone number in international format
   * sms: the message to be sent
   */
  sendMessage(data) {
    return Termii.sendMessage(data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new CustomError(err.response.status, err.response.data.message);
      });
  },
};
export default Message;
