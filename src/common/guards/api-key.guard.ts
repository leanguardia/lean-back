import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { timingSafeEqual } from 'crypto';

const API_KEY_HEADER = 'x-api-key';

/**
 * Validates the request using a simple API key from the X-API-Key header.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const providedKey = this.extractKeyFromHeader(request);

    const expectedKey = this.configService.get<string>('API_KEY');
    if (!expectedKey) {
      throw new UnauthorizedException('API key is not configured');
    }

    if (!providedKey) {
      throw new UnauthorizedException('Missing or invalid API key');
    }

    if (!this.isValidKey(providedKey, expectedKey)) {
      throw new UnauthorizedException('Missing or invalid API key');
    }

    return true;
  }

  private extractKeyFromHeader(request: Request): string | undefined {
    const key = request.headers[API_KEY_HEADER];
    if (typeof key === 'string') {
      return key;
    }
    if (Array.isArray(key) && key.length > 0 && typeof key[0] === 'string') {
      return key[0];
    }
    return undefined;
  }

  /**
   * Timing-safe comparison to prevent leaking information via response time.
   */
  private isValidKey(provided: string, expected: string): boolean {
    try {
      const providedBuffer = Buffer.from(provided, 'utf8');
      const expectedBuffer = Buffer.from(expected, 'utf8');
      if (providedBuffer.length !== expectedBuffer.length) {
        return false;
      }
      return timingSafeEqual(providedBuffer, expectedBuffer);
    } catch {
      return false;
    }
  }
}
