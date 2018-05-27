export function classNames(...args: (string | {[key: string]: boolean})[]) {
  return args
    .map(arg => {
      if (typeof arg === 'string') return arg;

      return Object.keys(arg).reduce((acc, key) => {
        if (arg[key]) return (acc += key);
        return acc;
      }, '');
    })
    .join(' ');
}
