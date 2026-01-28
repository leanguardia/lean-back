import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  chatWithAI(): string {
    console.log('Chat with AI');
    return 'Hello, how can I help you today? I\'m a chatbot powered by AI.';
  }
}
