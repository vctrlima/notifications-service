import InMemoryNotificationRepository from '@test/repository/in-memory-notification-repository';
import { randomUUID } from 'crypto';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'Notification content',
      category: 'Common category',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
