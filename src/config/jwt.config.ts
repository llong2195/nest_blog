import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'JWT';
export const JWT_EXPIRES_TIME = process.env.JWT_EXPIRES_TIME || '5m';
