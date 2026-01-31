import { AiModule } from '../ai/ai.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConversationModule } from './conversation/conversation.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AiModule, ConversationModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}