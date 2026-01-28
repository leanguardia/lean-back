import { Body, Controller, Post } from '@nestjs/common';

import { ChatService } from './chat.service';
import { SendMessageDto, MessageResponseDto } from './dto/message.dto';
import { ConversationDto } from './dto/conversation.dto';
import { Conversation } from './entities/conversation.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('start')
  startConversation(): ConversationDto {
    return new Conversation();
  }

  @Post()
  sendMessage(@Body() userMessage: SendMessageDto): MessageResponseDto {
    return this.chatService.chat(userMessage);
  }
}
