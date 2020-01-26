const hasPath = (e, path) =>
  typeof e === 'object' && e !== null && path in e;

const isFn = (e) => typeof e === 'function';

export const invoke = (e, path, ...args) =>
  path.split('.').reduce((curr, part) => {
    if (!hasPath(curr, part)) return null;
    if (isFn(curr[part])) curr[part](...args);
    return curr[part];
  }, e);
