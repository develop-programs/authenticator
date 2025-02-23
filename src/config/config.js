import dotenv from "dotenv";

// Load environment variables
const envResult = dotenv.config();
if (envResult.error) {
  throw new Error('⚠️  Couldn\'t find .env file  ⚠️');
}

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const isProd = process.env.NODE_ENV === 'production';

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOptions: {
    origin: isProd ? process.env.CORS_ORIGIN : '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: isProd ? 24 * 60 * 60 : 3600, // 24 hours in production, 1 hour in development
    preflightContinue: false,
    optionsSuccessStatus: 204,
    // Additional security headers for production
    ...(isProd && {
      strictSSL: true,
      securityHeaders: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
      }
    })
  },
  // Additional production configurations
  security: {
    rateLimiting: isProd,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: isProd ? 100 : 1000 // limit each IP to 100 requests per windowMs in production
    }
  }
};
