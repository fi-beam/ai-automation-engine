import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { info, error } from '../core/logger';
import { readFileSync } from 'fs';
import { join } from 'path';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function initializeDatabase(): Promise<void> {
  try {
    db = await open({
      filename: './data/app.db',
      driver: sqlite3.Database,
    });

    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    await db.exec(schema);
    
    info('Database initialized successfully');
  } catch (err) {
    error(`Database initialization failed: ${err instanceof Error ? err.message : String(err)}`);
    throw err;
  }
}

export function getDatabase(): Database<sqlite3.Database, sqlite3.Statement> {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export async function savePost(content: string, tweetId: string | null): Promise<number> {
  const database = getDatabase();
  const result = await database.run(
    'INSERT INTO posts (content, tweet_id) VALUES (?, ?)',
    [content, tweetId]
  );
  return result.lastID || 0;
}
