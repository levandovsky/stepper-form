export type Validator<T> = (value: T) => string | null;

export type ValidatorCreator<T> = (errorMessage: string) => Validator<T>;

export const required: ValidatorCreator<any> = (errorMessage) => (value) => {
    if (value === null || value === undefined || value === "") {
        return errorMessage;
    }

    return null;
};
