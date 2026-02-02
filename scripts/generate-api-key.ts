import { randomBytes } from 'crypto';

const apiKey = `sk_live_${randomBytes(32).toString('hex')}`;
console.log('Tu nueva API Key:');
console.log(apiKey);
