import {Todo} from '../store';

export interface RemoteDataService {
  createTodo: (text: string) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<boolean>;
  getTodos: () => Promise<Todo[]>;
  updateTodo: (todo: Todo) => Promise<Todo>;
}
