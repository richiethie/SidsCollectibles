import { z } from 'zod';

const envSchema = z.object({
  // Shopify Storefront API
  SHOPIFY_STOREFRONT_API_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_STORE_DOMAIN: z.string().min(1),
  
  // Shopify Admin API
  SHOPIFY_ADMIN_API_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_API_VERSION: z.string().min(1),
  
  // Email Configuration
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  
  // App Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse(process.env);

// Helper function to check if we're in development
export const isDevelopment = env.NODE_ENV === 'development';

// Helper function to check if we're in production
export const isProduction = env.NODE_ENV === 'production';
