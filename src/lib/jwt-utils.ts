/**
 * JWT Utility functions for debugging and validation
 */

export interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

/**
 * Decode a JWT token without verification (for debugging only)
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('[JWT] Invalid token format: expected 3 parts');
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('[JWT] Failed to decode token:', error);
    return null;
  }
}

/**
 * Check if a JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true; // Assume expired if we can't check
  }

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

/**
 * Get time until token expires (in seconds)
 */
export function getTokenExpiryTime(token: string): number | null {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  return payload.exp - now;
}

/**
 * Debug token information
 */
export function debugToken(token: string | null): void {
  console.log('[JWT Debug]', {
    hasToken: !!token,
    tokenLength: token?.length,
    tokenPreview: token ? `${token.substring(0, 20)}...` : 'none',
    tokenEnd: token ? `...${token.substring(token.length - 20)}` : 'none',
    hasThreeParts: token ? token.split('.').length === 3 : false,
  });

  if (token) {
    const payload = decodeJWT(token);
    if (payload) {
      const expiry = getTokenExpiryTime(token);
      console.log('[JWT Payload]', {
        exp: payload.exp,
        iat: payload.iat,
        expiresInSeconds: expiry,
        isExpired: expiry !== null && expiry < 0,
        ...payload,
      });
    }
  }
}
