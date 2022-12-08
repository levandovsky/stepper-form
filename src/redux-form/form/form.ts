import {
    ActionCreatorWithPayload,
    AnyAction,
    CombinedState,
    combineReducers,
    createSlice,
    Draft,
    PayloadAction,
    Reducer,
} from "@reduxjs/toolkit";
import { createControl } from "../control/control";
import { Control, ControlConfig, ControlState } from "../control/types";
import {
    FormControlConfig,
    FormControlFromConfig,
    FormValue,
    FormReducers,
    FormErrors,
    Form,
    FormControlType,
} from "./types";

const createFormControl = function <T, FormName extends string, ControlName extends string>({
    value,
    name,
    formName,
    validateOnChange = true,
    validators = [],
}: FormControlConfig<T, FormName, ControlName>): Control<T, ControlName> {
    type State = Record<FormName, Record<ControlName, ControlState<T>>>;

    const control = createControl(name, { value, validateOnChange, validators });

    return Object.assign(control, {
        selectors: {
            getValue: (state: State) => state[formName][name].value,
            getErrors: (state: State) => state[formName][name].errors,
            getDirty: (state: State) => state[formName][name].dirty,
        },
    });
};

export const createForm = function <
    T extends Record<string, ControlConfig<any>>,
    K extends keyof T = keyof T,
>(name: string, config: T): Form<T, K> {
    const controls = {} as Record<K, FormControlFromConfig<T[K]>>;
    let controlReducers = {} as FormReducers<T>;

    for (const [key, controlConfig] of Object.entries(config)) {
        const control = createFormControl({
            ...controlConfig,
            formName: name,
            name: key,
        }) as FormControlFromConfig<T[K]>;

        controls[key as K] = control;
        controlReducers = { ...controlReducers, ...control.register() };
    }

    const formReducer = combineReducers(controlReducers);

    const getValue = (state: any): FormValue<T> => {
        const values = {} as FormValue<T>;

        for (const [key, control] of Object.entries(controls)) {
            const c = control as Control<any, typeof key>;
            values[key as keyof FormValue<T>] = c.selectors.getValue(state);
        }

        return values;
    };

    const getErrors = (state: any): FormErrors<T> => {
        const errors = {} as Record<string, string[]>;

        for (const [key, control] of Object.entries(controls)) {
            const c = control as Control<any, typeof key>;
            errors[key] = c.selectors.getErrors(state);
        }

        return errors as FormErrors<T>;
    };

    return {
        controls,
        getValue,
        getErrors,
        register: () => ({
            [name]: formReducer as Reducer<
                CombinedState<
                    Record<K, ControlState<FormControlType<FormControlFromConfig<T[K]>>>>
                >,
                AnyAction
            >,
        }),
    };
};
