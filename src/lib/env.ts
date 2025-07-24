// Force load environment variables for NextAuth
// This is a workaround for Next.js 15 + NextAuth environment loading issues

const getEnvValue = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

// Export environment variables with fallbacks
export const env = {
  NEXTAUTH_SECRET: getEnvValue('NEXTAUTH_SECRET', 'your-super-secret-key-change-this-in-production-12345678901234567890'),
  NEXTAUTH_URL: getEnvValue('NEXTAUTH_URL', 'http://localhost:3000'),
  DATABASE_URL: getEnvValue('DATABASE_URL', 'file:./dev.db'),
  NODE_ENV: process.env.NODE_ENV || 'development'
} as const

// Log environment status (only in development)
if (process.env.NODE_ENV !== 'production') {
  console.log('🔧 Environment variables loaded:', {
    NEXTAUTH_SECRET: env.NEXTAUTH_SECRET ? '✅ SET' : '❌ NOT SET',
    NEXTAUTH_URL: env.NEXTAUTH_URL || '❌ NOT SET',
    DATABASE_URL: env.DATABASE_URL ? '✅ SET' : '❌ NOT SET',
  })
} 