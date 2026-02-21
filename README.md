# X (Twitter) Automation Bot

A minimal, production-ready Node.js bot that auto-generates and posts tweets using OpenAI and Twitter API v2.

## Features

- 🤖 OpenAI-powered tweet generation
- 🐦 Twitter API v2 integration
- ⏰ Cron scheduling (09:00, 13:00, 20:30 WIB daily)
- 🚂 Railway-ready deployment
- 📝 TypeScript
- 🔒 Environment-based configuration

## Tech Stack

- Node.js (LTS)
- TypeScript
- OpenAI SDK
- Twitter API v2
- node-cron
- dotenv

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd x-automation-bot
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Run Locally

```bash
npm run dev
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `TWITTER_APP_KEY` | Twitter API Key | Yes |
| `TWITTER_APP_SECRET` | Twitter API Secret | Yes |
| `TWITTER_ACCESS_TOKEN` | Twitter Access Token | Yes |
| `TWITTER_ACCESS_SECRET` | Twitter Access Token Secret | Yes |
| `OPENAI_MODEL` | OpenAI model (default: gpt-4o-mini) | No |

## Railway Deployment

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create Project

```bash
# Option 1: Railway CLI
npm install -g @railway/cli
railway login
railway init

# Option 2: GitHub Integration
# Push to GitHub, then connect repo in Railway dashboard
```

### Step 3: Set Environment Variables

**Via Railway Dashboard:**
1. Go to your project → Variables tab
2. Click "New Variable"
3. Add each variable from `.env.example`

**Via Railway CLI:**
```bash
railway variables set OPENAI_API_KEY="sk-xxx"
railway variables set TWITTER_APP_KEY="xxx"
railway variables set TWITTER_APP_SECRET="xxx"
railway variables set TWITTER_ACCESS_TOKEN="xxx"
railway variables set TWITTER_ACCESS_SECRET="xxx"
```

### Step 4: Deploy

```bash
# Deploy from CLI
railway up

# Or enable auto-deploy on git push in dashboard
```

### Step 5: Verify

Check Railway logs to confirm bot is running:
```bash
railway logs
```

## Twitter API Setup

1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a Project → App
3. Generate API Keys and Access Tokens
4. **Important:** Ensure your app has **Read and Write** permissions
5. Copy credentials to environment variables

## Project Structure

```
src/
├── config/
│   └── env.ts           # Environment configuration
├── jobs/
│   └── postJob.ts       # Cron job logic
├── prompts/
│   └── systemPrompt.ts  # OpenAI system prompt
├── services/
│   ├── openai.ts        # OpenAI API service
│   └── twitter.ts       # Twitter API service
└── index.ts             # Entry point
```

## Cron Schedule

Posts run at (WIB timezone):
- **09:00 WIB** (02:00 UTC)
- **13:00 WIB** (06:00 UTC) 
- **20:30 WIB** (13:30 UTC)

## Logs

View logs in Railway dashboard or CLI:
```bash
railway logs
railway logs --follow
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check Twitter API credentials |
| 403 Forbidden | Ensure app has Write permissions |
| 429 Rate Limit | Wait before retrying |
| OpenAI errors | Verify API key and billing |

## License

MIT
