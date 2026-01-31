import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,
  ) {}

  async create(ipAddress: string, userAgent: string): Promise<Conversation> {
    const conversation = this.conversationRepo.create({
      ipAddress,
      userAgent,
    });
    await this.conversationRepo.save(conversation);
    return conversation;
  }
}
