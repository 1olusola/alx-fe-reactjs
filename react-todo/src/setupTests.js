import '@testing-library/jest-dom';

// Mock console.errors to reduce test noise
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      /Warning: ReactDOM.render is deprecated/.test(args[0]) ||
      /Warning:.*not wrapped in act/.test(args[0])
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
