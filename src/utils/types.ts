import { ComponentType } from "react";

export type UnwrapProps<T> = T extends ComponentType<infer U> ? U : never;
