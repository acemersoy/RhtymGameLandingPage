import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "waitlist.db");

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        locale TEXT DEFAULT 'tr',
        created_at TEXT DEFAULT (datetime('now')),
        notified INTEGER DEFAULT 0
      )
    `);
  }
  return _db;
}

export function addSubscriber(
  email: string,
  locale: string
): { success: boolean; already: boolean } {
  const db = getDb();
  try {
    db.prepare("INSERT INTO subscribers (email, locale) VALUES (?, ?)").run(
      email.toLowerCase().trim(),
      locale
    );
    return { success: true, already: false };
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message.includes("UNIQUE constraint failed")
    ) {
      return { success: true, already: true };
    }
    throw err;
  }
}

export function getAllUnnotified(): {
  id: number;
  email: string;
  locale: string;
}[] {
  const db = getDb();
  return db
    .prepare("SELECT id, email, locale FROM subscribers WHERE notified = 0")
    .all() as { id: number; email: string; locale: string }[];
}

export function markNotified(id: number): void {
  const db = getDb();
  db.prepare("UPDATE subscribers SET notified = 1 WHERE id = ?").run(id);
}

export function getSubscriberCount(): number {
  const db = getDb();
  const row = db.prepare("SELECT COUNT(*) as count FROM subscribers").get() as { count: number };
  return row.count;
}
