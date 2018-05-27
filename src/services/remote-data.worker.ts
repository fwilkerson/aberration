import {Todo} from '../store';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const idFactory = createIdFactory();

export function getTodos(): Promise<Todo[]> {
  return sleep(250).then(() => [
    {id: idFactory.next(), text: 'Unit tests?', completed: false},
  ]);
}

export function createTodo(text: string): Promise<Todo> {
  return sleep(250).then(() => ({
    id: idFactory.next(),
    text,
    completed: false,
  }));
}

export function createIdFactory() {
  let id = 0;
  return {
    next: () => ++id,
  };
}
