import { PrismaNotificationMapper } from '@infra/database/prisma/mappers/prisma-notification-mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Notification } from 'src/app/entities/notification';
import { NotificationRepository } from 'src/app/repositories/notification-repository';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: { id: notification.id },
      data: raw,
    });
  }
}
