import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';

import { app } from '../../firebase.config';
import { initialTaskState, Task } from '../models';

export class DatabaseService {
  private static _instance: DatabaseService;
  #db: Firestore;

  private constructor() {
    this.#db = getFirestore(app);
  }

  static get instance(): DatabaseService {
    if (!DatabaseService._instance) {
      DatabaseService._instance = new DatabaseService();
    }
    return DatabaseService._instance;
  }

  getTasks(setTasks: (tasks: Task[]) => void): Unsubscribe {
    const queryTasks = query(
      collection(this.#db, 'tasks'),
      where('completedAt', '==', null),
      where('deletedAt', '==', null),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(queryTasks, (querySnapshot) => {
      const tasks = querySnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Task)
      );
      setTasks(tasks);
    });
    return unsubscribe;
  }

  async createTask(task: Partial<Task>): Promise<void> {
    try {
      const newTask: Task = Object.assign({}, initialTaskState, task);
      const now = new Date().toISOString();
      await addDoc(collection(this.#db, 'tasks'), {
        ...newTask,
        createdAt: now,
        updatedAt: now,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateTask(taskId: string, updatedTask: Partial<Task>): Promise<void> {
    try {
      await updateDoc(doc(this.#db, 'tasks', taskId), {
        ...updatedTask,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      const now = new Date().toISOString();
      await updateDoc(doc(this.#db, 'tasks', taskId), {
        deletedAt: now,
        updatedAt: now,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
