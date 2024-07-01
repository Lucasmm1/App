import { useSQLiteContext } from 'expo-sqlite';

export type PlanDatabase = {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  custo: string;
  icone: string;
};

export type ExpenseDatabase = {
  id: number;
  plan_id: number;
  name: string;
  cost: number;
};

export type TaskDatabase = {
  id: number;
  plan_id: number;
  name: string;
  deadline: string;
  completed: boolean;
};

export function usePlanDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<PlanDatabase, 'id'>) {
    const statement = await database.prepareAsync(
      'INSERT INTO plans (nome, descricao, categoria, custo, icone) VALUES ($nome, $descricao, $categoria, $custo, $icone)'
    );

    try {
      const result = await statement.executeAsync({
        $nome: data.nome,
        $descricao: data.descricao,
        $categoria: data.categoria,
        $custo: data.custo,
        $icone: data.icone,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getAll() {
    const query = 'SELECT * FROM plans';
    try {
      const response = await database.getAllAsync<PlanDatabase>(query);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function insertTestData() {
    const testData = [
      {
        nome: 'Viagem Teste',
        categoria: 'Viagem',
        custo: '500',
        icone: '🌴',
      },
      {
        nome: 'Evento de Teste',
        categoria: 'Eventos',
        custo: '200',
        icone: '🎉',
      },
    ];

    for (const data of testData) {
      await create(data);
    }
  }

  // Funções para Expenses
  async function createExpense(data: Omit<ExpenseDatabase, 'id'>) {
    const statement = await database.prepareAsync(
      'INSERT INTO expenses (plan_id, name, cost) VALUES ($plan_id, $name, $cost)'
    );

    try {
      const result = await statement.executeAsync({
        $plan_id: data.plan_id,
        $name: data.name,
        $cost: data.cost,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getAllExpenses(planId: number) {
    const query = 'SELECT * FROM expenses WHERE plan_id = ?';
    try {
      const response = await database.getAllAsync<ExpenseDatabase>(query, [planId]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Funções para Tasks
  async function createTask(data: Omit<TaskDatabase, 'id'>) {
    const statement = await database.prepareAsync(
      'INSERT INTO tasks (plan_id, name, deadline, completed) VALUES ($plan_id, $name, $deadline, $completed)'
    );

    try {
      const result = await statement.executeAsync({
        $plan_id: data.plan_id,
        $name: data.name,
        $deadline: data.deadline,
        $completed: data.completed,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getAllTasks(planId: number) {
    const query = 'SELECT * FROM tasks WHERE plan_id = ?';
    try {
      const response = await database.getAllAsync<TaskDatabase>(query, [planId]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Função para obter um plano pelo ID
  async function getPlanById(id: number) {
    const query = 'SELECT * FROM plans WHERE id = ?';
    try {
      const response = await database.getAllAsync<PlanDatabase>(query, [id]);
      return response[0];
    } catch (error) {
      throw error;
    }
  }

  // Função para deletar um plano pelo ID
  async function deletePlanById(id: number) {
    const statement = await database.prepareAsync(
      'DELETE FROM plans WHERE id = ?'
    );

    try {
      await statement.executeAsync([id]);
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  return { create, getAll, insertTestData, createExpense, getAllExpenses, createTask, getAllTasks, getPlanById, deletePlanById };
}
