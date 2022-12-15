import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import InMemoryNotificationRepository from '@test/repository/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = new Notification(makeNotification());
    await notificationRepository.create(notification);
    await readNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
