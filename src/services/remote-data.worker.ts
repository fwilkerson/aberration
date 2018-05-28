import {Todo} from '../store';

const sleep = (ms = 300) => new Promise(res => setTimeout(res, ms));

const idFactory = createIdFactory();

export function createTodo(text: string): Promise<Todo> {
  return sleep().then(() => ({
    id: idFactory.next(),
    text,
    completed: false,
  }));
}

export function deleteTodo(id: number): Promise<boolean> {
  return sleep().then(() => true);
}

export function getTodos(): Promise<Todo[]> {
  return sleep().then(() => [
    {id: idFactory.next(), text: 'Unit tests?', completed: false},
  ]);
}

export function updateTodo(todo: Todo): Promise<Todo> {
  return sleep().then(() => todo);
}

function createIdFactory() {
  let id = 0;
  return {
    next: () => ++id,
  };
}
