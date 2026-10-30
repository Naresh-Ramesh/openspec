import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance = null;

export const getDatabasePath = () => {
  if (process.env.DB_PATH) {
    return process.env.DB_PATH;
  }
  const defaultDir = path.resolve(__dirname, '../data');
  return path.join(defaultDir, 'policy.db');
};

export const initDatabase = (customPath = null) => {
  const dbPath = customPath || getDatabasePath();

  if (dbPath !== ':memory:') {
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
  }

  dbInstance = new DatabaseSync(dbPath);
  dbInstance.exec('PRAGMA foreign_keys = ON;');

  return dbInstance;
};

export const getDb = () => {
  if (!dbInstance) {
    return initDatabase();
  }
  return dbInstance;
};

export const closeDatabase = () => {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
};

