import { Notification as RawNotification } from '@prisma/client';
import { Content, Notification } from '@app/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        recipientId: raw.recipientId,
        content: new Content(raw.content),
        category: raw.category,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
        canceledAt: raw.canceledAt,
      },
      raw.id,
    );
  }
}
