export function classNames(...args: (string | {[key: string]: boolean})[]) {
  return args
    .reduce((names: string[], next) => {
      if (typeof next === 'string') return names.concat(next);
      return names.concat(
        Object.keys(next).reduce((conditionals: string[], key) => {
          return next[key] ? conditionals.concat(key) : conditionals;
        }, [])
      );
    }, [])
    .join(' ');
}
