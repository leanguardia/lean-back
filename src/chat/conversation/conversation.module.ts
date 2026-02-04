import { ConversationService } from './conversation.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}