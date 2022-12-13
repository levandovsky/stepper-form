import { Color, colors } from "@app/styles/variables";
import { useStepperData } from "@stepper/Stepper";
import { FC, useMemo } from "react";
import styled from "styled-components";
import { steps } from "./stepper";

type ColorProp = {
    color: Color;
};

const StepWrapper = styled.div<ColorProp>`
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
    color: ${({ color }) => colors[color]};
`;

const Line = styled.div<ColorProp>`
    height: 30px;
    width: 2px;
    background-color: ${({ color }) => colors[color]};
`;

const Icon = styled.div<ColorProp>`
    height: 20px;
    width: 20px;
    background-color: transparent;
    border-radius: 50%;
    border: 2px solid ${({ color }) => colors[color]};
    color: ${({ color }) => colors[color]};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
`;

const Percentage = styled.div`
    font-size: 1rem;
    color: ${colors.blue};
    margin-bottom: 0.5rem;
`;

type StepProps = {
    label: string;
    step: number;
};

const Step: FC<StepProps> = ({ step, label }) => {
    const { currentStep } = useStepperData();

    if (step > currentStep) {
        return (
            <StepWrapper color="gray">
                <Line color="gray" />
                {label}
            </StepWrapper>
        );
    }

    if (step < currentStep) {
        return (
            <StepWrapper color="blue">
                <Line color="blue" />
                {label}
                <Icon color="blue">✓</Icon>
            </StepWrapper>
        );
    }

    return (
        <StepWrapper color="darkGray">
            <Line color="darkGray" />
            {label}
        </StepWrapper>
    );
};

export const StepperProgress: FC = () => {
    const { currentStep } = useStepperData();

    const stepperCompetionPercentage = useMemo(
        () => Math.floor(((currentStep + 1) * 100) / steps.length),
        [currentStep]
    );

    return (
        <div>
            <Percentage>{stepperCompetionPercentage}%</Percentage>
            {steps.map((step, index) => (
                <Step key={step.path} step={index} label={step.name} />
            ))}
        </div>
    );
};
