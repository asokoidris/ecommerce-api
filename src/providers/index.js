import fs from 'fs';
import path from 'path';
import sendmail from './notifications/email/services';

/**
 *
 * @param channel
 * @param type
 * @param label
 * @param vars
 * @param alias
 * @param user
 * @returns {*}
 */
export const sendNotification = (
  channel,
  { type, label, vars, alias },
  user
) => {
  const notificationPath = path.join(
    __dirname,
    `./common/${channel.toLowerCase()}`
  );

  let notification;
  const rawNotifications = fs.readFileSync(
    path.join(notificationPath, `${type.toLowerCase()}.json`)
  );
  const notifications = JSON.parse(rawNotifications);
  try {
    const notificationLabel = Object.keys(notifications).find(
      (notificationKey) => notificationKey === label
    );
    notification = notifications[notificationLabel];
    notification = template(JSON.stringify(notification))({ ...vars });
    notification = JSON.parse(notification);
    logger.info(
      `getNotificationForChannel -> notification: ${JSON.stringify(
        notification
      )}, channel: ${channel}`
    );
    switch (channel) {
      case NOTIFICATION_CHANNELS.EMAIL:
        try {
          return sendmail({
            to: user.email,
            name: `${user.firstName} ${user.lastName}`,
            subject: notification.subject,
            body: notification.body,
            url: notification.url,
            cta: notification.cta,
            emailPayload: notification.payload || {},
            template: notification.template,
            alias,
          });
        } catch (error) {
          logger.error(`sendemail -> error: ${error.message}`);
        }
      // NOTE: we will add this later if we need to send sms
      // case NOTIFICATION_CHANNELS.SMS:
      //   return sendSms(notification);

      // defualt send email
      default:
        return sendemail({
          to: user.email,
          name: `${user.firstName} ${user.lastName}`,
          subject: notification.subject,
          body: notification.body,
          url: notification.url,
          cta: notification.cta,
          emailPayload: notification.payload || {},
          template: notification.template,
          alias,
        });
    }
  } catch (error) {
    logger.error(`getNotificationForChannel -> error: ${error.message}`);
  }
};
