import 'dotenv/config';
import { app } from './app.js';
import { initDatabase, getDatabasePath } from './db.js';

const PORT = process.env.PORT || 5000;

try {
  initDatabase();
  console.log(`[db] SQLite database initialized at ${getDatabasePath()}`);
} catch (error) {
  console.error('[db] Failed to initialize SQLite database:', error);
  process.exit(1);
}

const HOST = process.env.HOST || '127.0.0.1';

const server = app.listen(PORT, HOST, () => {
  console.log(`[server] Backend API listening on http://${HOST}:${PORT}`);
});

export default server;
