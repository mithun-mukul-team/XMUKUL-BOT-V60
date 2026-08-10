"use strict";

const fs = require("fs-extra");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_DIR = __dirname;
const DB_FILE = path.join(DB_DIR, "mukul.sqlite");

fs.ensureDirSync(DB_DIR);

const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error(
      "[DATABASE ERROR]",
      err.message
    );
    return;
  }

  console.log(
    "[DATABASE] SQLite connected."
  );
});

// Create basic tables
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      name TEXT,
      created_at INTEGER,
      updated_at INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS threads (
      thread_id TEXT PRIMARY KEY,
      name TEXT,
      prefix TEXT DEFAULT '*',
      created_at INTEGER,
      updated_at INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);
});

// User save/update
function saveUser(userID, name = "") {
  return new Promise((resolve, reject) => {
    const now = Date.now();

    db.run(
      `
      INSERT INTO users
        (user_id, name, created_at, updated_at)
      VALUES
        (?, ?, ?, ?)
      ON CONFLICT(user_id)
      DO UPDATE SET
        name = excluded.name,
        updated_at = excluded.updated_at
      `,
      [userID, name, now, now],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
}

// Get user
function getUser(userID) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT *
      FROM users
      WHERE user_id = ?
      `,
      [userID],
      (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      }
    );
  });
}

// Save thread
function saveThread(
  threadID,
  name = "",
  prefix = "*"
) {
  return new Promise((resolve, reject) => {
    const now = Date.now();

    db.run(
      `
      INSERT INTO threads
        (thread_id, name, prefix, created_at, updated_at)
      VALUES
        (?, ?, ?, ?, ?)
      ON CONFLICT(thread_id)
      DO UPDATE SET
        name = excluded.name,
        prefix = excluded.prefix,
        updated_at = excluded.updated_at
      `,
      [
        threadID,
        name,
        prefix,
        now,
        now
      ],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
}

// Get thread
function getThread(threadID) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT *
      FROM threads
      WHERE thread_id = ?
      `,
      [threadID],
      (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      }
    );
  });
}

// Generic setting
function setSetting(key, value) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO settings
        (key, value)
      VALUES
        (?, ?)
      ON CONFLICT(key)
      DO UPDATE SET
        value = excluded.value
      `,
      [
        key,
        JSON.stringify(value)
      ],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
}

// Get setting
function getSetting(key) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT value
      FROM settings
      WHERE key = ?
      `,
      [key],
      (err, row) => {
        if (err) return reject(err);

        if (!row) {
          return resolve(null);
        }

        try {
          resolve(
            JSON.parse(row.value)
          );
        } catch {
          resolve(row.value);
        }
      }
    );
  });
}

// Close database
function close() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

module.exports = {
  db,
  saveUser,
  getUser,
  saveThread,
  getThread,
  setSetting,
  getSetting,
  close
};
