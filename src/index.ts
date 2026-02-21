import cron from "node-cron";
import { validateEnv, env } from "./config/env";
import { runPostJob } from "./jobs/postJob";
import { verifyCredentials } from "./services/twitter";

const CRON_SCHEDULES = {
  WIB_09_00: "0 2 * * *",
  WIB_13_00: "0 6 * * *",
  WIB_20_30: "30 13 * * *",
} as const;

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("X Automation Bot Starting...");
  console.log(`Environment: ${env.nodeEnv}`);
  console.log("=".repeat(50));

  try {
    validateEnv();
    await verifyCredentials();

    console.log("\n[Cron] Setting up schedules (WIB timezone):");
    console.log("  - 09:00 WIB (02:00 UTC)");
    console.log("  - 13:00 WIB (06:00 UTC)");
    console.log("  - 20:30 WIB (13:30 UTC)");

    cron.schedule(CRON_SCHEDULES.WIB_09_00, async () => {
      console.log("\n[Cron] Triggered: 09:00 WIB");
      await runPostJob();
    });

    cron.schedule(CRON_SCHEDULES.WIB_13_00, async () => {
      console.log("\n[Cron] Triggered: 13:00 WIB");
      await runPostJob();
    });

    cron.schedule(CRON_SCHEDULES.WIB_20_30, async () => {
      console.log("\n[Cron] Triggered: 20:30 WIB");
      await runPostJob();
    });

    console.log("\n[Test] Running immediate test post...");
    await runPostJob();
    console.log("[Test] Test post completed successfully\n");

    console.log("[Bot] Running and waiting for cron triggers...");

  } catch (error) {
    console.error("\n[Fatal] Failed to start bot:", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  console.log("\n[Bot] Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n[Bot] Shutting down gracefully...");
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  console.error("[Fatal] Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[Fatal] Unhandled rejection:", reason);
  process.exit(1);
});

main();
