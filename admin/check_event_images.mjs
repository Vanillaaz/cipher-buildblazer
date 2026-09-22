import { neon } from '@neondatabase/serverless';

const dbUrl = 'postgresql://neondb_owner:npg_dDhN7Puc5jYM@ep-falling-term-az28w7vu-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(dbUrl);

async function checkImages() {
  const rows = await sql`SELECT id, title, image, gallery FROM events ORDER BY date DESC`;
  console.log(JSON.stringify(rows, null, 2));
}

checkImages().catch(console.error);
