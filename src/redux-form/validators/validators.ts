export type Validator<T> = (value: T) => string | null;

export type ErrorMessageCallback<T> = (value: T) => string;

export type ValidatorCreator<T> = (
    errorMessage: string | ErrorMessageCallback<T>
) => Validator<T>;

export function createValidator<T>(
    errorMessage: string,
    validate: (value: T) => boolean
): Validator<T>;
export function createValidator<T>(
    errorMessage: ErrorMessageCallback<T>,
    validate: (value: T) => boolean
): Validator<T>;
export function createValidator<T>(
    errorOrCallback: string | ErrorMessageCallback<T>,
    validate: (value: T) => boolean
): Validator<T> {
    const validator: Validator<T> = (value: T) => {
        if (!validate(value)) {
            if (typeof errorOrCallback === "function") {
                return errorOrCallback(value);
            }

            return errorOrCallback;
        }

        return null;
    };

    return validator;
}
