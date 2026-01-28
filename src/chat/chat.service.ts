import { MessageResponseDto, SendMessageDto } from './dto/message.dto';

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class ChatService {
  chat(userMessage: SendMessageDto): MessageResponseDto {
    const aiResponse: MessageResponseDto = {
      id: randomUUID(),
      message: 'Hello, how can I help you today? I\'m a chatbot powered by AI.',
      conversation_id: userMessage.conversation_id,
      timestamp: new Date(),
    };

    return aiResponse;
  }
}
