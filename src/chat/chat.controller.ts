import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import type { Request } from 'express';

import { ChatService } from './chat.service';
import { SendMessageDto, MessageResponseDto } from './dto/message.dto';
import { ConversationDto } from './dto/conversation.dto';
import { ConversationService } from './conversation/conversation.service';
import { getClientIp } from '../common/utils/get-client-ip';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('chat')
@UseGuards(ApiKeyGuard)
@ApiSecurity('api-key')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly conversationService: ConversationService
  ) {}

  @Post('start')
  async startConversation(@Req() req): Promise<ConversationDto> {
    const request = req as Request;
    return this.conversationService.create(
      getClientIp(request),
      request.get('user-agent') ?? 'unknown'
    );
  }

  @Post()
  async sendMessage(@Body() userMessage: SendMessageDto): Promise<MessageResponseDto> {
    return this.chatService.chat(userMessage);
  }
}
