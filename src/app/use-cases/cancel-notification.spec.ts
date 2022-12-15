import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import InMemoryNotificationRepository from '@test/repository/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification(makeNotification());
    await notificationRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
