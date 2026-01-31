import { AiProvider } from './ai-provider.interface';
import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

const DEFAULT_MODEL = 'gemini-2.0-flash-001';
const SYSTEM_INSTRUCTION_PATH = join(__dirname, 'lean-system-instruction.txt');

@Injectable()
export class GoogleGenAiService implements AiProvider {
  private readonly client: GoogleGenAI;
  private readonly model: string;
  private readonly systemInstruction: string;

  constructor() {
    this.client = new GoogleGenAI({
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
    });
    this.model = DEFAULT_MODEL;
    this.systemInstruction = readFileSync(SYSTEM_INSTRUCTION_PATH, 'utf-8').trim();
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        systemInstruction: this.systemInstruction,
      },
    });

    console.log('AI response:', response);
    const text = response.text ?? '';

    return text;
  }
}
