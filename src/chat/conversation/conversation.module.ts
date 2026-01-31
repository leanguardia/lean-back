import { Conversation } from '../entities/conversation.entity';
import { ConversationService } from './conversation.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}