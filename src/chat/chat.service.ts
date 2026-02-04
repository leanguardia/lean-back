import { MessageResponseDto, SendMessageDto } from './dto/message.dto';

import { Inject, Injectable } from '@nestjs/common';
import type { AiProvider } from '../ai/ai-provider.interface';
import { AI_PROVIDER } from '../ai/ai-provider.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(
    @Inject(AI_PROVIDER) private readonly aiProvider: AiProvider,
    private readonly prisma: PrismaService,
  ) {}

  async chat(userMessage: SendMessageDto): Promise<MessageResponseDto> {
    const savedUserMessage = await this.prisma.message.create({
      data: {
        conversation_id: userMessage.conversationId,
        content: userMessage.message,
        role: 'user',
      },
    });

    const aiResponseContent = await this.aiProvider.generateResponse(userMessage.message);

    const savedAiMessage = await this.prisma.message.create({
      data: {
        conversation_id: userMessage.conversationId,
        content: aiResponseContent,
        role: 'lean_ai',
      },
    });

    return {
      id: savedAiMessage.id,
      message: aiResponseContent,
      conversationId: userMessage.conversationId,
      timestamp: savedAiMessage.created_at,
    };
  }
}
