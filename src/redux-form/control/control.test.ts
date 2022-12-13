import { describe, expect, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { required } from "@form/validators/default";
import { createControl } from "./control";

describe("Control", () => {
    it("should be able to create a control", () => {
        const control = createControl("test", { value: "test" });
        expect(control).toBeDefined();
    });

    it("can be added to the store", () => {
        const { register } = createControl("test", { value: "test" });
        const store = configureStore({ reducer: register() });

        expect(store.getState().test).toBeDefined();
        expect(store.getState().test.value).toBe("test");
    });

    it("should allow setting the value", () => {
        const {
            actions: { setValue },
            register,
        } = createControl("test", { value: "test" });
        const store = configureStore({ reducer: register() });

        store.dispatch(setValue("test2"));

        expect(store.getState().test.value).toBe("test2");
    });

    it("validates the value on change", () => {
        const {
            actions: { setValue },
            register,
        } = createControl("test", {
            value: "test",
            validators: [required("test")],
        });

        const store = configureStore({ reducer: register() });

        expect(store.getState().test.errors).toEqual([]);

        store.dispatch(setValue(""));

        expect(store.getState().test.errors).toEqual(["test"]);
    });

    it("doesn't validate the value on change if validateOnChange is false", () => {
        const {
            actions: { setValue },
            register,
        } = createControl("test", {
            value: "test",
            validateOnChange: false,
            validators: [required("test")],
        });

        const store = configureStore({ reducer: register() });

        expect(store.getState().test.errors).toEqual([]);

        store.dispatch(setValue(""));

        expect(store.getState().test.errors).toEqual([]);
    });

    it("allows manually validating the value", () => {
        const {
            actions: { validate },
            register,
        } = createControl("test", {
            value: "",
            validators: [required("test")],
            validateOnChange: false,
        });

        const store = configureStore({ reducer: register() });

        expect(store.getState().test.errors).toEqual([]);

        store.dispatch(validate());

        expect(store.getState().test.errors).toEqual(["test"]);
    });

    it("should allow resetting the value", () => {
        const {
            actions: { reset, setValue },
            register,
        } = createControl("test", { value: "test" });
        const store = configureStore({ reducer: register() });

        store.dispatch(setValue("test1"));
        expect(store.getState().test.value).toBe("test1");

        store.dispatch(reset());

        expect(store.getState().test.value).toBe("test");
    });

    it("should allow inspecting value, errors and dirty fields of the control", () => {
        const control = createControl("test", {
            value: "test",
            validators: [required("test")],
        });
        const {
            selectors: { getValue, getErrors, getDirty },
            actions: { setValue },
        } = control;
        const store = configureStore({ reducer: control.register() });

        expect(getValue(store.getState())).toBe("test");
        expect(getErrors(store.getState())).toEqual([]);
        expect(getDirty(store.getState())).toBe(false);

        store.dispatch(setValue(""));

        expect(getValue(store.getState())).toBe("");
        expect(getErrors(store.getState())).toEqual(["test"]);
        expect(getDirty(store.getState())).toBe(true);
    });
});
