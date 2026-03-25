let listeners: ((value: boolean) => void)[] = [];

export const subscribeFn = (someFunction: (value: boolean) => void) => {
  listeners.push(someFunction);

  return () => {
    listeners = listeners.filter((listener) => listener !== someFunction);
  };
};

export const notify = (value: boolean) => {
  listeners.forEach((fn) => fn(value));
};
