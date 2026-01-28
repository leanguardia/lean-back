import { Controller, Post } from '@nestjs/common';

import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  chatWithAI(): string {
    return this.chatService.chatWithAI();
  }
}
