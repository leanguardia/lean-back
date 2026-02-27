export const AI_PROVIDER = Symbol('AI_PROVIDER');

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface AiProvider {
  readonly modelName: string;
  generateResponse(history: ChatMessage[]): Promise<string>;
}
