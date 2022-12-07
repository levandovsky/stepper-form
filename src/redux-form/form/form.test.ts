import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect } from "vitest";
import { createForm } from "./form";

describe("Form", () => {
    it("should be able to create a form with controls", () => {
        const form = createForm("form", {
            test: {
                value: "test",
            },
            test2: {
                value: 0,
            },
        });

        const store = configureStore({ reducer: form.register() });

        expect(form).toBeDefined();
        expect(form.controls.test).toBeDefined();
        expect(store.getState().form.test.value).toBe("test");
        expect(form.getValue(store.getState())).toEqual({ test: "test", test2: 0 });
    });

    it("should be able to create a form with controls and validators", () => {
        const form = createForm("form", {
            test: {
                value: "test",
                validators: [(value) => (value === "test" ? null : "test")],
            },
        });

        const store = configureStore({ reducer: form.register() });

        expect(form).toBeDefined();
        expect(form.controls.test).toBeDefined();
        expect(store.getState().form.test.value).toBe("test");
        expect(form.getValue(store.getState())).toEqual({ test: "test" });
    });

    it("has an error and value selectors", () => {
        const form = createForm("form", {
            test: {
                value: "test",
                validators: [(value) => (value === "test" ? null : "test")],
            },
        });

        const store = configureStore({ reducer: form.register() });

        expect(form.getErrors(store.getState())).toEqual({ test: [] });
        expect(form.getValue(store.getState())).toEqual({ test: "test" });
    });
});
