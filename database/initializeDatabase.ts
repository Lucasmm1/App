import { SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(database: SQLiteDatabase) {

  // await database.execAsync('DROP TABLE IF EXISTS plans');
  // await database.execAsync('DROP TABLE IF EXISTS expenses');
  // await database.execAsync('DROP TABLE IF EXISTS tasks');

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      categoria TEXT NOT NULL,
      custo TEXT NOT NULL,
      icone TEXT NOT NULL
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_id INTEGER,
      name TEXT NOT NULL,
      cost REAL NOT NULL,
      FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_id INTEGER,
      name TEXT NOT NULL,
      deadline DATE,
      completed BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
    );
  `);
}