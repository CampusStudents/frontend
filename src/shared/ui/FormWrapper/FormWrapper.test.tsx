// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import FormWrapper from "./FormWrapper";

describe("FormWrapper", () => {
    it("renders all sections and submits form", () => {
        const handleSubmit = vi.fn((event) => event.preventDefault());

        render(
            <FormWrapper
                onSubmit={handleSubmit}
                renderTitle={() => "Test title"}
                renderActions={() => <button type="button">action</button>}
                renderFields={() => <input aria-label="email" />}
                renderSubmit={() => <button type="submit">submit</button>}
                renderFooter={() => "footer"}
            />,
        );

        expect(screen.getByText("Test title")).toBeTruthy();
        expect(screen.getByRole("button", { name: "action" })).toBeTruthy();
        expect(screen.getByLabelText("email")).toBeTruthy();
        expect(screen.getByRole("button", { name: "submit" })).toBeTruthy();
        expect(screen.getByText("footer")).toBeTruthy();

        fireEvent.click(screen.getByRole("button", { name: "submit" }));

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
});
