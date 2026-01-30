import { MessageResponseDto, SendMessageDto } from './dto/message.dto';

import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { AiProvider } from '../ai/ai-provider.interface';
import { AI_PROVIDER } from '../ai/ai-provider.interface';

@Injectable()
export class ChatService {
  constructor(@Inject(AI_PROVIDER) private readonly aiProvider: AiProvider) {}

  async chat(userMessage: SendMessageDto): Promise<MessageResponseDto> {
    const message = await this.aiProvider.generateResponse(userMessage.message);

    return {
      id: randomUUID(),
      message,
      conversation_id: userMessage.conversation_id,
      timestamp: new Date(),
    };
  }
}
