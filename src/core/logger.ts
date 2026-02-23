function formatTimestamp(): string {
  return new Date().toISOString();
}

export function info(message: string): void {
  console.log(`[INFO] ${formatTimestamp()} - ${message}`);
}

export function error(message: string): void {
  console.error(`[ERROR] ${formatTimestamp()} - ${message}`);
}
