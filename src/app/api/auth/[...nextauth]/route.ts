import { env } from "@/lib/env";

// CRITICAL: Set the environment variable BEFORE importing NextAuth
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = env.NEXTAUTH_SECRET;
}

// Now import NextAuth AFTER setting the env var
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

console.log("🔐 NextAuth Route: Secret status:", process.env.NEXTAUTH_SECRET ? "✅ SET" : "❌ NOT SET");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 