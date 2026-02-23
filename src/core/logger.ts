export function info(message: string): void {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
}

export function error(message: string): void {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
}
