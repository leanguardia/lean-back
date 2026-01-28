import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  @IsNotEmpty()
  conversation_id: string;
}

export class MessageResponseDto {
  id: string;
  message: string;
  conversation_id: string;
  timestamp: Date;
}
