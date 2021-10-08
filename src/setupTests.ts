import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  server.resetHandlers(); // Removes custom added server calls
  server.restoreHandlers(); // Resets all server calls
});

// Clean up after the tests are finished.
afterAll(() => server.close());
