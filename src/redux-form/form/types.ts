import { AnyAction, CombinedState, Reducer } from "@reduxjs/toolkit";
import { ControlActions, ControlConfig, ControlSelectors, ControlState } from "../control/types";

export type FormControlConfig<
    T,
    FormName extends string,
    ControlName extends string,
> = ControlConfig<T> & {
    name: ControlName;
    formName: FormName;
};

export type FormControl<T> = {
    register: () => Record<string, Reducer<ControlState<T>, AnyAction>>;
    actions: ControlActions<T>;
    selectors: ControlSelectors<T>;
};

export type FormValue<T extends Record<string, ControlConfig<any>>> = T extends Record<
    string,
    ControlConfig<any>
>
    ? {
          [K in keyof T]: FormControlType<FormControlFromConfig<T[K]>>;
      }
    : never;

export type FormReducers<T extends Record<string, ControlConfig<any>>> = T extends Record<
    string,
    ControlConfig<any>
>
    ? {
          [K in keyof T]: Reducer<
              ControlState<FormControlType<FormControlFromConfig<T[K]>>>,
              AnyAction
          >;
      }
    : never;

export type FormErrors<T extends Record<string, ControlConfig<any>>> = T extends Record<
    string,
    ControlConfig<any>
>
    ? {
          [K in keyof T]: string[];
      }
    : never;

export type FormControlFromConfig<T> = T extends ControlConfig<infer U> ? FormControl<U> : never;

export type FormControlType<T> = T extends FormControl<infer U> ? U : never;

export type FormControlTypeFromConfig<T> = T extends ControlConfig<infer U> ? U : never;

export type Form<T extends Record<string, ControlConfig<any>>, K extends keyof T = keyof T> = {
    controls: Record<K, FormControlFromConfig<T[K]>>;
    getValue: (state: any) => FormValue<T>;
    getErrors: (state: any) => FormErrors<T>;
    register: () => Record<
        string,
        Reducer<
            CombinedState<Record<K, ControlState<FormControlType<FormControlFromConfig<T[K]>>>>>,
            AnyAction
        >
    >;
};
