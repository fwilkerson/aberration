import {Todo} from '../store';

export interface RemoteDataService {
  getTodos: () => Promise<Todo[]>;
  createTodo: (text: string) => Promise<Todo>;
}
