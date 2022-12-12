import { ControlConfig } from "@form/control/types";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControlType } from "./types";

export type Control<T> = {
    value: T;
    errors: string[];
    valid: boolean;
    setValue: (value: T) => void;
    validate: () => void;
};

export const useControl = function <
    T extends Record<string, ControlConfig<any>>
>(
    form: Form<T>,
    name: keyof Form<T>["controls"]
): Control<FormControlType<typeof control>> {
    const [formName] = Object.keys(form.register());
    const controlName = `${formName}/${name as string}`;
    const control = form.controls[controlName];
    type ControlType = FormControlType<typeof control>;

    const value = useSelector((state) => control.selectors.getValue(state));
    const errors = useSelector((state) => control.selectors.getErrors(state));
    const valid = useMemo(() => errors.length === 0, [errors]);
    const dispatch = useDispatch();
    const setValue = (value: ControlType) =>
        dispatch(control.actions.setValue(value));
    const validate = () => {
        dispatch(control.actions.validate());
    };

    return {
        value,
        errors,
        valid,
        setValue,
        validate,
    };
};
