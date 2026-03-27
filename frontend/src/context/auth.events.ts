let listeners: ((value: boolean) => void)[] = [];

export const subscribeFn = (someFunction: (value: boolean) => void) => {
  listeners.push(someFunction);
  console.log("Log 1 from auth.events context:", listeners);

  // return unsubscribe function to be called when component unmounts
  return () => {
    console.log("\nLog 2 from auth.events context:", listeners);
    listeners = listeners.filter((listener) => listener !== someFunction);
    console.log("\nLog 3 from auth.events context:", listeners);
  };
};

const notify = (value: boolean) => {
  listeners.forEach((fn) => fn(value));
  console.log("\nLog 4 from auth.events in notify function:", listeners);
};

export const authContext = { notify };
