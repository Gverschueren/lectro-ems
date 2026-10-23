import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import worker from "./worker/index.js";

const root = dirname(fileURLToPath(import.meta.url));
const dataPath = process.env.EMS_DB_PATH || resolve(root, "data/lectro-ems.sqlite");
const { mkdir } = await import("node:fs/promises");
await mkdir(dirname(dataPath), { recursive: true });
const sqlite = new DatabaseSync(dataPath);
sqlite.exec("PRAGMA foreign_keys = ON");
sqlite.exec("PRAGMA journal_mode = WAL");
sqlite.exec("CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL)");

const migrations = resolve(root, "drizzle");
for (const file of (await readdir(migrations)).filter((x) => x.endsWith(".sql")).sort()) {
  const exists = sqlite.prepare("SELECT name FROM schema_migrations WHERE name = ?").get(file);
  if (exists) continue;
  sqlite.exec("BEGIN");
  try {
    sqlite.exec(await readFile(resolve(migrations, file), "utf8"));
    sqlite.prepare("INSERT INTO schema_migrations(name, applied_at) VALUES (?, ?)").run(file, new Date().toISOString());
    sqlite.exec("COMMIT");
  } catch (error) {
    sqlite.exec("ROLLBACK");
    throw error;
  }
}

const db = {
  prepare(sql) {
    let params = [];
    const prepared = {
      bind(...values) { params = values; return prepared; },
      get sql() { return sql; },
      get params() { return params; },
      async all() { return { results: sqlite.prepare(sql).all(...params) }; },
      async run() { const result = sqlite.prepare(sql).run(...params); return { success: true, meta: { changes: Number(result.changes) } }; },
    };
    return prepared;
  },
  async batch(statements) {
    sqlite.exec("BEGIN");
    try {
      const results = [];
      for (const item of statements) {
        const result = sqlite.prepare(item.sql).run(...(item.params || []));
        results.push({ success: true, meta: { changes: Number(result.changes) } });
      }
      sqlite.exec("COMMIT");
      return results;
    } catch (error) {
      sqlite.exec("ROLLBACK");
      throw error;
    }
  },
};

const env = { DB: db, DB_KIND: "sqlite", ENVIRONMENT: process.env.ENVIRONMENT || "self-hosted-demo" };
const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || "127.0.0.1";
const server = createServer(async (incoming, outgoing) => {
  try {
    const chunks = [];
    for await (const chunk of incoming) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    const url = `http://${incoming.headers.host || `127.0.0.1:${port}`}${incoming.url || "/"}`;
    const method = incoming.method || "GET";
    const request = new Request(url, {
      method,
      headers: incoming.headers,
      ...(method === "GET" || method === "HEAD" ? {} : { body }),
    });
    const response = await worker.fetch(request, env, {});
    outgoing.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    outgoing.writeHead(500, { "content-type": "application/json" });
    outgoing.end(JSON.stringify({ error: "internal_error", message: String(error.message || error) }));
  }
});
server.listen(port, host, () => console.log(`Lectro EMS listening on ${host}:${port}; database=${dataPath}`));

function close() { server.close(() => { sqlite.close(); process.exit(0); }); }
process.on("SIGTERM", close);
process.on("SIGINT", close);
