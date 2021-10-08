import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server";

beforeAll(() => {
  var localStorageMock = (function () {
    var store: Record<string, unknown> = {};

    return {
      getItem: function (key: string) {
        return store[key] || null;
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
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

test("Setup correct", () => {
  expect(localStorage).toBeDefined();
});
