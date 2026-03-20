// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import FormWrapper from "./FormWrapper";

describe("FormWrapper", () => {
    it("renders all slots and submits form", () => {
        const handleSubmit = vi.fn((event) => event.preventDefault());

        render(
            <FormWrapper onSubmit={handleSubmit}>
                <FormWrapper.Title>Test title</FormWrapper.Title>
                <FormWrapper.Actions>
                    <button type="button">action</button>
                </FormWrapper.Actions>
                <FormWrapper.Fields>
                    <input aria-label="email" />
                </FormWrapper.Fields>
                <FormWrapper.Submit>
                    <button type="submit">submit</button>
                </FormWrapper.Submit>
                <FormWrapper.Footer>footer</FormWrapper.Footer>
            </FormWrapper>,
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
