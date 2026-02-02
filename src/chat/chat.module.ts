import { AiModule } from '../ai/ai.module';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConversationModule } from './conversation/conversation.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AiModule, ConversationModule],
  controllers: [ChatController],
  providers: [ChatService, ApiKeyGuard],
})
export class ChatModule {}
