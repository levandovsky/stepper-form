import { ControlConfig } from "@form/control/types";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "./types";

export const useField = function <T extends Record<string, ControlConfig<any>>>(
    form: Form<T>,
    name: keyof Form<T>["controls"],
) {
    const control = form.controls[name];
    const value = useSelector((state) => control.selectors.getValue(state));
    const error = useSelector((state) => control.selectors.getErrors(state));
    const dispatch = useDispatch();
    const setValue = (value: any) => dispatch(control.actions.setValue(value));

    return {
        value,
        error,
        setValue,
    };
};
