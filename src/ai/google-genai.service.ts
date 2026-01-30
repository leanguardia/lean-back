import { AiProvider } from './ai-provider.interface';
import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';

const DEFAULT_MODEL = 'gemini-2.0-flash-001';

@Injectable()
export class GoogleGenAiService implements AiProvider {
  private readonly client: GoogleGenAI;
  private readonly model: string;

  constructor() {
    this.client = new GoogleGenAI({ 
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
    });
    this.model = DEFAULT_MODEL;
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    const text = response.text ?? '';
    console.log('AI response:', text);

    return text;
  }
}
