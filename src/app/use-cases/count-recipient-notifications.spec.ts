import { makeNotification } from '@test/factories/notification-factory';
import InMemoryNotificationRepository from '@test/repository/in-memory-notification-repository';
import { randomUUID } from 'crypto';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: randomUUID() }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'static-recipient-id' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'static-recipient-id' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'static-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
