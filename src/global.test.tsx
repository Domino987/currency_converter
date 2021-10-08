import { screen, render } from "@testing-library/react";
import App from "./App";

describe("Global Setup", () => {
  test("Renders without fail", () => {
    render(<App />);
    screen.logTestingPlaygroundURL();
  });
});
