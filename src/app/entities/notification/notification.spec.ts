import { makeNotification } from '@test/factories/notification-factory';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification(makeNotification());

    expect(notification).toBeTruthy();
  });
});
