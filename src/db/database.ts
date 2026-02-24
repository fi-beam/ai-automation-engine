import { Pool, PoolClient } from 'pg';
import { info, error } from '../core/logger';
import { DATABASE_URL } from '../core/config';

let pool: Pool | null = null;

export async function initializeDatabase(): Promise<void> {
  try {
    pool = new Pool({
      connectionString: DATABASE_URL,
    });

    const client = await pool.connect();
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        tweet_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        engagement_score INTEGER DEFAULT 0
      )
    `);
    
    client.release();
    info('Database initialized successfully');
  } catch (err) {
    error(`Database initialization failed: ${err instanceof Error ? err.message : String(err)}`);
    throw err;
  }
}

export function getPool(): Pool {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return pool;
}

export async function savePost(content: string, tweetId: string | null): Promise<number> {
  const client = await getPool().connect();
  try {
    const result = await client.query(
      'INSERT INTO posts (content, tweet_id) VALUES ($1, $2) RETURNING id',
      [content, tweetId]
    );
    return result.rows[0].id;
  } finally {
    client.release();
  }
}
