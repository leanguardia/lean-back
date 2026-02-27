import { ConversationDto } from '../dto/conversation.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ipAddress: string, userAgent: string, languageModel: string): Promise<ConversationDto> {
    const conversation = await this.prisma.conversation.create({
      data: {
        ipAddress,
        userAgent,
        language_model: languageModel,
      },
    });

    return {
      id: conversation.id,
      createdAt: conversation.created_at,
      modelName: languageModel,
    };
  }
}
