import { createValidator } from "./validators";

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const phoneNumberRegex = /^\+?[0-9]{6,}$/;

export const required = (errorMessage: string) =>
    createValidator(
        errorMessage,
        (value: any) => value !== undefined && value !== null && value !== ""
    );

export const email = (errorMessage: string) =>
    createValidator<string>(errorMessage, (value: string) =>
        emailRegex.test(value)
    );

export const phoneNumber = (errorMessage: string) =>
    createValidator<string>(errorMessage, (value: string) =>
        phoneNumberRegex.test(value)
    );
