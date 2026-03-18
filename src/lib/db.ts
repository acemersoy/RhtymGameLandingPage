import { neon } from "@neondatabase/serverless";

function getSQL() {
  return neon(process.env.DATABASE_URL!);
}

export async function ensureTable() {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      locale TEXT DEFAULT 'tr',
      created_at TIMESTAMP DEFAULT NOW(),
      notified BOOLEAN DEFAULT FALSE
    )
  `;
}

export async function addSubscriber(
  email: string,
  locale: string
): Promise<{ success: boolean; already: boolean }> {
  const sql = getSQL();
  await ensureTable();
  try {
    await sql`
      INSERT INTO subscribers (email, locale)
      VALUES (${email.toLowerCase().trim()}, ${locale})
    `;
    return { success: true, already: false };
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message.includes("duplicate key value")
    ) {
      return { success: true, already: true };
    }
    throw err;
  }
}

export async function getAllUnnotified(): Promise<
  { id: number; email: string; locale: string }[]
> {
  const sql = getSQL();
  await ensureTable();
  const rows = await sql`
    SELECT id, email, locale FROM subscribers WHERE notified = FALSE
  `;
  return rows as { id: number; email: string; locale: string }[];
}

export async function markNotified(id: number): Promise<void> {
  const sql = getSQL();
  await sql`UPDATE subscribers SET notified = TRUE WHERE id = ${id}`;
}

export async function getSubscriberCount(): Promise<number> {
  const sql = getSQL();
  await ensureTable();
  const rows = await sql`SELECT COUNT(*) as count FROM subscribers`;
  return Number(rows[0].count);
}
