import { test, describe, afterEach } from 'node:test';
import assert from 'node:assert';
import { initDatabase, closeDatabase } from '../src/db.js';

describe('SQLite Database Module', () => {
  afterEach(() => {
    closeDatabase();
  });

  test('initializes database and executes SQL queries', () => {
    const db = initDatabase(':memory:');
    assert.ok(db);
    db.exec('CREATE TABLE test_table (id INTEGER PRIMARY KEY, name TEXT);');
    const stmt = db.prepare('INSERT INTO test_table (name) VALUES (?)');
    stmt.run('Policy A');
    const query = db.prepare('SELECT * FROM test_table WHERE name = ?');
    const row = query.get('Policy A');
    assert.strictEqual(row.name, 'Policy A');
  });
});

