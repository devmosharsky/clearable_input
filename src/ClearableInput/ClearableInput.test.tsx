import * as React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { ClearableInput } from "./ClearableInput";
describe("ClearableInput", () => {
    const renderAndGetInners = (element: React.ReactElement<any>) => {
        const rendered = render(element);
        const fragment = rendered.asFragment();
        const input = fragment.querySelector("input");
        const button = fragment.querySelector("button");
        return { input, button, rendered};
    };

    beforeEach(() => cleanup());

    it("can render", () => {
        const { input, button } = renderAndGetInners(<ClearableInput />);
        expect(input).not.toBeNull();
        expect(button).toBeNull();
    }),
        it("can set native attributes", () => {
            const { input } = renderAndGetInners(<ClearableInput alt="alt" />);
            expect(input).not.toBeNull();
            expect(input.attributes.getNamedItem("alt")).toEqual(expect.objectContaining({ value: "alt" }));
        });

    it("can set default value", () => {
        const { input, button } = renderAndGetInners(<ClearableInput value="value" />);
        expect(input.value).toBe("value");
        expect(button).not.toBeNull();
    });

    it("can handle value change", () => {
        const onValueChange = jest.fn();
        const { rendered } = renderAndGetInners(<ClearableInput value="value" onChange={(e) => {e.persist();onValueChange(e);}} />);
        fireEvent.change(rendered.getByDisplayValue("value"), { target: { value: 'newValue' } })
        expect(onValueChange).toHaveBeenCalled();
        const event = onValueChange.mock.calls[0][0];
        expect(event.type).toBe('change');
        expect(event.target.tagName).toBe('INPUT');
    });

    it("can handle value change if push clear button", () => {
        const onValueChange = jest.fn();
        const { rendered } = renderAndGetInners(<ClearableInput value="value" onChange={(e) => {e.persist();onValueChange(e);}} />);
        fireEvent.click(rendered.getByText("x"));
        expect(onValueChange).toHaveBeenCalled();
        const event = onValueChange.mock.calls[0][0];
        expect(event.type).toBe('change');
        expect(event.target.tagName).toBe('INPUT');
    });
});
