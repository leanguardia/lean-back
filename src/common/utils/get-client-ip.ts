import { Request } from 'express';

/**
 * Extracts the client IP address from a request.
 * Handles x-forwarded-for (string, array, comma-separated), req.ip, and socket.remoteAddress.
 */
export function getClientIp(req: Request): string {
  // x-forwarded-for can be string, string[], or undefined
  const xForwardedFor = req.headers['x-forwarded-for'];

  if (xForwardedFor) {
    const forwarded = Array.isArray(xForwardedFor)
      ? xForwardedFor[0]
      : xForwardedFor.split(',')[0];
    return forwarded?.trim() || 'unknown';
  }

  // req.ip is set by Express (respects trust proxy setting)
  if (req.ip) {
    return req.ip;
  }

  // Fallback to socket remote address
  const remoteAddress = req.socket?.remoteAddress;
  if (remoteAddress) {
    // Normalize IPv6 localhost to IPv4
    return remoteAddress === '::1' ? '127.0.0.1' : remoteAddress;
  }

  return 'unknown';
}
