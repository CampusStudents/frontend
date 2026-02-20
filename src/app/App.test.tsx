import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

test("loads and displays greeting", async () => {
    // ARRANGE
    render(<App />);
    expect(document.querySelector("h1")).toHaveTextContent("Vite + React");
});
