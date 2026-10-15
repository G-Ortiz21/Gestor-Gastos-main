import { SQLiteDatabase} from 'expo-sqlite';

//Nombre del archivo base de datos que se crea dentro del telefono
export const DATABASE_NAME = 'gastos.db';

//Se ejecuta una cada vez que sae abre la base (lo llama SQLiteProvider).
// Aquí se crean las tablas si todavía no existen.
export async function initDatabase(db: SQLiteDatabase): Promise<void> {
    //
    //
    //
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS expenses (
            id          TEXT PRIMARY KEY NOT NULL,  -- el mismo id string que ya usa la app
            amount      REAL NOT NULL,              -- REAL = numero con decimales
            category    TEXT NOT NULL,              
            date        TEXT NOT NULL,              -- fecha en formato ISO 8601
            description TEXT                        -- puede ser NULL porque es opcional
        );
    `);
}

