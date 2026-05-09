export const logger = {
  info: (...args) => {
    if (__DEV__) {
      // Keep dev logs for diagnostics.
      console.log(...args);
    }
  },
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args),
};
