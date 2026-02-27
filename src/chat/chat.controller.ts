import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import type { Request } from 'express';

import { ChatService } from './chat.service';
import { SendMessageDto, MessageResponseDto } from './dto/message.dto';
import { ConversationDto } from './dto/conversation.dto';
import { ConversationService } from './conversation/conversation.service';
import { getClientIp } from '../common/utils/get-client-ip';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import type { AiProvider } from '../ai/ai-provider.interface';
import { AI_PROVIDER } from '../ai/ai-provider.interface';

@Controller('chat')
  @UseGuards(ApiKeyGuard)
@ApiSecurity('api-key')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly conversationService: ConversationService,
    @Inject(AI_PROVIDER) private readonly aiProvider: AiProvider,
  ) {}

  @Post('start')
  async startConversation(@Req() req): Promise<ConversationDto> {
    const request = req as Request;
    return this.conversationService.create(
      getClientIp(request),
      request.get('user-agent') ?? 'unknown',
      this.aiProvider.modelName,
    );
  }

  @Post()
  async sendMessage(@Body() userMessage: SendMessageDto): Promise<MessageResponseDto> {
    return this.chatService.chat(userMessage);
  }
}
