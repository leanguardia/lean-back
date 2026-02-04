import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  @IsNotEmpty()
  conversationId: string;
}

export class MessageResponseDto {
  id: string;
  message: string;
  conversationId: string;
  timestamp: Date;
}
