# Authentication Setup Guide

This guide explains how to set up authentication for the Markdown to Medium Converter app.

## Features

- ✅ **GitHub OAuth**: Sign in with GitHub account
- ✅ **Email/Password**: Traditional email and password registration
- ✅ **Account Linking**: Link GitHub account to existing email account
- ✅ **Database Storage**: User data stored in SQLite database
- ✅ **Session Management**: Secure session handling with NextAuth.js
- ✅ **Protected Routes**: Middleware protection for authenticated routes

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# GitHub OAuth (Optional - for GitHub sign-in)
GITHUB_ID=""
GITHUB_SECRET=""
```