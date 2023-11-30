import fs from 'fs';
import path from 'path';
import template from 'lodash/template';
import sendmail from './email/services/index';
import { NOTIFICATION_CHANNELS, USER_TYPE } from '../../utils/constant/options';
import sendSms from './sms/services/index';

/**
 * Get notification details for a channel.
 * @param {String} channel The notification channel.
 * @param {Object} payload The notification payload.
 * @param {String} payload.type The notification type.
 * @param {String} payload.label The notification label.
 * @param {Object} payload.vars The template variables.
 * @param user
 * @param {Object} payload.user The user object.
 * @returns {Object} The notification object.
 */

export const sendNotification = (
  channel,
  { type, label, vars, alias },
  user,
  userType = USER_TYPE.USER
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
            to:
              userType === USER_TYPE.BUSINESS ? user.businessEmail : user.email,
            name:
              userType === USER_TYPE.BUSINESS
                ? user.businessName
                : `${user.firstName} ${user.lastName}`,
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
      case NOTIFICATION_CHANNELS.SMS:
        return sendSms({
          to:
            user.UserType === USER_TYPE.BUSINESS
              ? user.businessPhone
              : user.phone,
          body: notification.body,
          payload: notification.payload || {},
        });

      default:
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
    }
  } catch (error) {
    logger.error(`getNotificationForChannel -> error: ${error.message}`);
  }
};
