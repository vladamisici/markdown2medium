import { NextResponse } from "next/server"
import { env } from "@/lib/env"

export async function GET() {
  // Check both process.env and our env loader
  const envStatus = {
    // Direct process.env check
    process_env: {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "NOT SET",
      DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
      NODE_ENV: process.env.NODE_ENV || "NOT SET"
    },
    // Our env loader
    env_loader: {
      NEXTAUTH_SECRET: env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
      NEXTAUTH_URL: env.NEXTAUTH_URL || "NOT SET",
      DATABASE_URL: env.DATABASE_URL ? "SET" : "NOT SET",
      NODE_ENV: env.NODE_ENV || "NOT SET"
    },
    // Values (partial, for security)
    values: {
      NEXTAUTH_SECRET_LENGTH: env.NEXTAUTH_SECRET?.length || 0,
      NEXTAUTH_URL: env.NEXTAUTH_URL,
      NODE_ENV: env.NODE_ENV
    }
  }

  return NextResponse.json(envStatus, { 
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })
} 