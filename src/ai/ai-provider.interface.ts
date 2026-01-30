export const AI_PROVIDER = Symbol('AI_PROVIDER');

export interface AiProvider {
  generateResponse(prompt: string): Promise<string>;
}
