import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import InMemoryNotificationRepository from '@test/repository/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = new Notification(
      makeNotification({
        readAt: new Date(),
      }),
    );
    await notificationRepository.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
