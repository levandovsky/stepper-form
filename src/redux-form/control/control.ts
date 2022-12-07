import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    createSlice,
    Draft,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Control, ControlConfig, ControlState } from "./types";

export const createControl = function <K extends string, T>(
    name: K,
    { value, validateOnChange = true, validators = [] }: ControlConfig<T>,
): Control<T, K> {
    const validate = (value: T) =>
        validators.map((v) => v(value)).filter((e) => e !== null) as string[];

    const control: ControlState<T> = {
        value,
        dirty: false,
        errors: validateOnChange ? validate(value) : [],
    };

    const slice = createSlice({
        name,
        initialState: control,
        reducers: {
            setValue(state, action: PayloadAction<T>) {
                state.value = action.payload as Draft<T>;
                if (!state.dirty) state.dirty = true;

                if (validateOnChange) state.errors = validate(state.value as T);
            },

            validate(state) {
                state.errors = validate(state.value as T);
            },

            reset(state) {
                state.value = value as Draft<T>;
                state.errors = validate(state.value as T);
            },
        },
    });

    return {
        actions: {
            setValue: slice.actions.setValue as ActionCreatorWithPayload<T>,
            validate: slice.actions.validate as ActionCreatorWithoutPayload,
            reset: slice.actions.reset as ActionCreatorWithoutPayload,
        },
        selectors: {
            getValue: (state: any) => state[name].value,
            getErrors: (state: any) => state[name].errors,
            getDirty: (state: any) => state[name].dirty,
        },
        register: () =>
            ({
                [name]: slice.reducer,
            } as Record<K, typeof slice.reducer>),
    };
};
