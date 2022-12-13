import type { UnwrapProps } from "@utils/types";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import { Redirect, useLocation } from "wouter";

export type Stepper = {
    currentStep: number;
    isLastStep: boolean;
    isFirstStep: boolean;
    totalSteps: number;
    getStepByPath: (path: string) => number;
    prevStep: () => void;
    nextStep: () => void;
};

const StepperContext = createContext<Stepper | null>(null);

export type Step = {
    path: string;
    name: string;
    component: React.ComponentType<any>;
};

export const useStepperData = () => {
    const stepper = useContext(StepperContext);
    if (!stepper) {
        throw new Error("useStepperData must be used within a Stepper");
    }
    return stepper;
};

export const withStepper =
    (Component: React.ComponentType<any>) =>
    (props: UnwrapProps<typeof Component> & Stepper) => {
        const stepper = useStepperData();
        return <Component {...props} {...stepper} />;
    };

export const createRoutableStepper = <T extends Step[]>(steps: T) => {
    const renderSteps = () => {
        return steps.map((step) => {
            const Component = step.component;

            return <Component key={step.path} path={step.path} />;
        });
    };

    const StepperProvider: FC<{ children?: ReactNode | ReactNode[] }> = ({
        children,
    }) => {
        const maxStep = steps.length - 1;
        const [location, setLocation] = useLocation();

        const validStep = steps.find((step) => step.path === location);

        if (!validStep) {
            return <Redirect to={steps[0].path} />;
        }

        const currentStep = useMemo(
            () => steps.findIndex((step) => step.path === location),
            [location]
        );

        const isLastStep = currentStep === maxStep;
        const isFirstStep = currentStep === 0;

        const prevStep = () => {
            if (currentStep < 0) return;

            const prev = steps[currentStep - 1];

            if (!prev) return;

            setLocation(prev.path);
        };

        const nextStep = () => {
            if (currentStep >= maxStep) return;

            const next = steps[currentStep + 1];

            if (!next) return;

            setLocation(next.path);
        };

        const getStepByPath = (path: string) => {
            return steps.findIndex((step) => step.path === path);
        };

        const contextValue = useMemo<Stepper>(
            () => ({
                currentStep,
                isLastStep,
                isFirstStep,
                totalSteps: steps.length,
                getStepByPath,
                prevStep,
                nextStep,
            }),
            [currentStep]
        );

        return (
            <StepperContext.Provider value={contextValue}>
                {children}
            </StepperContext.Provider>
        );
    };

    return {
        StepperProvider,
        renderSteps,
    };
};
