import { AiModule } from '../ai/ai.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AiModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}