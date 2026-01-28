import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}