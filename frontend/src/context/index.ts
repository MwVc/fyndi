let listeners: any = [];

export const subscribeFn = (someFunction: any) => {
  listeners.push(someFunction);
};

export const notify = (value: any) => {
  listeners.forEach((fn: any) => fn(value));
};
