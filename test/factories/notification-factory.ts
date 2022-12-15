import {
  Content,
  Notification,
  NotificationProps,
} from '@app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'static-recipient-id',
    content: new Content('Notification content'),
    category: 'Notification category',
    ...override,
  });
}
