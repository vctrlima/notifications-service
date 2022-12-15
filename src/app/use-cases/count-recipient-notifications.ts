import { NotificationRepository } from '@app/repositories/notification-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsParams {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationsParams,
  ): Promise<CountRecipientNotificationsResponse> {
    const count = await this.notificationRepository.countManyByRecipientId(
      request.recipientId,
    );

    return { count };
  }
}
