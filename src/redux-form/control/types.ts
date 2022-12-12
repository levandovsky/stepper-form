import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    Reducer,
} from "@reduxjs/toolkit";
import { Validator } from "@form/validators/validators";

export type ControlState<T> = {
    value: T;
    dirty: boolean;
    errors: string[];
};

export type ControlActions<T> = {
    setValue: ActionCreatorWithPayload<T>;
    reset: ActionCreatorWithoutPayload;
    validate: ActionCreatorWithoutPayload;
};

export type ControlSelectors<T> = {
    getValue: (state: any) => T;
    getErrors: (state: any) => string[];
    getDirty: (state: any) => boolean;
};

export type Control<Type, Name extends string> = {
    actions: ControlActions<Type>;
    selectors: ControlSelectors<Type>;
    register: () => Record<Name, Reducer<ControlState<Type>, AnyAction>>;
};

export type ControlConfig<T> = {
    value: T;
    validateOnChange?: boolean;
    validators?: Validator<T>[];
};
