import { config } from "dotenv";

config();

export const env = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  },
  twitter: {
    appKey: process.env.TWITTER_APP_KEY || "",
    appSecret: process.env.TWITTER_APP_SECRET || "",
    accessToken: process.env.TWITTER_ACCESS_TOKEN || "",
    accessSecret: process.env.TWITTER_ACCESS_SECRET || "",
  },
  nodeEnv: process.env.NODE_ENV || "development",
} as const;

export function validateEnv(): void {
  const required = [
    { key: "OPENAI_API_KEY", value: env.openai.apiKey },
    { key: "TWITTER_APP_KEY", value: env.twitter.appKey },
    { key: "TWITTER_APP_SECRET", value: env.twitter.appSecret },
    { key: "TWITTER_ACCESS_TOKEN", value: env.twitter.accessToken },
    { key: "TWITTER_ACCESS_SECRET", value: env.twitter.accessSecret },
  ];

  const missing = required.filter((r) => !r.value).map((r) => r.key);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  console.log("[ENV] All required environment variables are set");
}
