import { SQLiteDatabase } from "expo-sqlite";
import { Category, Expense } from "@/types/expense";


//Forma en que una fila llega a SQLITE
// No es igual a Expense: la fecha viene como texto y la descripción como null
interface ExpenseRow {
    id: string,
    amount: number;
    category: string;
    date: string;
    description: string | null;
    receptionUri: string | null;

}

//Convierte una fila de la tabla en un objeto Expense que enteinde la app
function rowToExpense(row: ExpenseRow): Expense {
    return {
        id: row.id,
        amount: row.amount,
        category: row.category as Category,
        date: new Date(row.date),
        description: row.description ?? undefined,
        receptionUri: row.receptionUri ?? undefined,
    };
}

export async function getAllExpenses(db: SQLiteDatabase): Promise<Expense[]> {

    const rows = await db.getAllAsync<ExpenseRow>(
        'SELECT id, amount, category, date, description, receptionUri  FROM expenses ORDER BY date DESC'
    );
    return rows.map(rowToExpense);
}

export async function insertExpense(db: SQLiteDatabase, expense: Expense): Promise<void> {

    await db.runAsync(
        'INSERT INTO expenses ( id, amount, category, date, description) VALUES (?, ?, ?, ?, ?, ?)',
        expense.id,
        expense.amount,
        expense.category,
        expense.date.toISOString(),
        expense.description ?? null,
        expense.receptionUri ?? null
    );
}

export async function updateExpense(db: SQLiteDatabase, expense: Expense): Promise<void> {
    await db.runAsync(
        'UPDATE expenses SET amount = ?, category = ?, date = ?, description = ?, receptionUri = ? WHERE id = ?',
        expense.amount,
        expense.category,
        expense.date.toISOString(),
        expense.description ?? null,
        expense.receptionUri ?? null,
        expense.id
    );
}

export async function deleteExpenseFromDb(db: SQLiteDatabase, id: string): Promise<void> {
    await db.runAsync('DELETE FROM expenses WHERE id = ?', id);
}