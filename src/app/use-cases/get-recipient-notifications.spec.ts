import { makeNotification } from '@test/factories/notification-factory';
import InMemoryNotificationRepository from '@test/repository/in-memory-notification-repository';
import { randomUUID } from 'crypto';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'static-recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'static-recipient-id' }),
        expect.objectContaining({ recipientId: 'static-recipient-id' }),
      ]),
    );
  });
});
