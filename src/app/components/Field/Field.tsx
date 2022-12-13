import styled from "styled-components";
import { FC, InputHTMLAttributes } from "react";
import { colors } from "@styles/variables";
import { motion, useAnimation } from "framer-motion";

export type FieldProps = {
    name: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onClick?: () => void;
    label?: string;
    errors?: string[];
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur" | "onFocus" | "onClick">;

const FieldError: FC<{ errors: string[] }> = ({ errors }) => {
    return (
        <div>
            <div>{errors[0]}</div>
        </div>
    );
};

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const Label = styled(motion.label)<InvalidProp>`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    font-weight: 300;
    display: block;
    pointer-events: none;
    color: ${({ invalid }) => (invalid ? colors.red : colors.text)};
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 25px;
`;

const WithLabel = styled.div`
    position: relative;
    width: 100%;
    height: fit-content;
`;

type InvalidProp = {
    invalid: boolean;
};

const Input = styled.input<InvalidProp>`
    padding: 16px;
    width: 100%;
    border: 1px solid ${({ invalid }) => (invalid ? colors.red : colors.gray)};
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    transition: border-color 0.2s ease-in-out;
    outline: none;

    &:hover {
        border-color: ${({ invalid }) =>
            invalid ? colors.red : colors.darkGray};
    }

    &:focus {
        border-color: ${({ invalid }) => (invalid ? colors.red : colors.blue)};
    }
`;

const ErrorContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    color: ${colors.red};
`;

export const Field: FC<FieldProps> = ({
    label,
    name,
    onChange,
    errors = [],
    ...inputProps
}: FieldProps) => {
    const labelControls = useAnimation();
    const invalid = !!errors.length;

    const putLabelOnTop = () => {
        if (inputProps.value) return;

        labelControls.start({
            top: 10,
            fontSize: "10px",
        });
    };

    const putLabelBackToCenter = () => {
        if (inputProps.value) return;

        labelControls.start({
            top: "50%",
            fontSize: "18px",
        });
    };

    return (
        <FieldWrapper>
            <InputContainer>
                <WithLabel>
                    <Label
                        animate={labelControls}
                        initial={{
                            top: inputProps.value ? 10 : "50%",
                            fontSize: inputProps.value ? "10px" : "18px",
                        }}
                        transition={{
                            type: "tween",
                            ease: "easeOut",
                            duration: 0.1,
                        }}
                        htmlFor={name}
                        invalid={invalid}
                    >
                        {label || name}
                    </Label>

                    <Input
                        type={inputProps.type}
                        name={name}
                        {...inputProps}
                        onClick={() => {
                            putLabelOnTop();
                            if (inputProps.onClick) inputProps.onClick();
                        }}
                        onBlur={() => {
                            putLabelBackToCenter();
                            if (inputProps.onBlur) inputProps.onBlur();
                        }}
                        onFocus={() => {
                            putLabelOnTop();
                            if (inputProps.onFocus) inputProps.onFocus();
                        }}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                        invalid={invalid}
                    />
                </WithLabel>

                <ErrorContainer>
                    <FieldError errors={errors} />
                </ErrorContainer>
            </InputContainer>
        </FieldWrapper>
    );
};
