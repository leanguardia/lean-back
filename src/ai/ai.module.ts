import { AI_PROVIDER } from './ai-provider.interface';
import { GoogleGenAiService } from './google-genai.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    GoogleGenAiService,
    {
      provide: AI_PROVIDER,
      useClass: GoogleGenAiService,
    },
  ],
  exports: [AI_PROVIDER],
})
export class AiModule {}
