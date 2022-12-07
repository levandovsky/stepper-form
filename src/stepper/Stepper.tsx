import type { UnwrapProps } from "@utils/types";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";

export type Stepper = {
    currentStep: number;
    isLastStep: boolean;
    prevStep: () => void;
    nextStep: () => void;
};

const StepperContext = createContext<Stepper | null>(null);

type Step = {
    path: string;
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
    (Component: React.ComponentType<any>) => (props: UnwrapProps<typeof Component> & Stepper) => {
        const stepper = useStepperData();
        return <Component {...props} {...stepper} />;
    };

export const createRoutableStepper =
    <T extends Step[]>(steps: T) =>
    ({ children }: { children?: ReactNode | ReactNode[] }) => {
        const maxStep = steps.length - 1;
        const [location, setLocation] = useLocation();
        const currentStep = useMemo(
            () => steps.findIndex((step) => step.path === location),
            [location],
        );
        const isLastStep = currentStep === maxStep;

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

        const contextValue = useMemo<Stepper>(
            () => ({
                currentStep,
                isLastStep,
                prevStep,
                nextStep,
            }),
            [currentStep],
        );

        return (
            <StepperContext.Provider value={contextValue}>
                <Switch>
                    {steps.map((step) => (
                        <Route key={step.path} path={step.path} component={step.component} />
                    ))}

                    <Route path={`/:rest*`}>
                        <Redirect to={steps[0].path} />
                    </Route>
                </Switch>
                {children}
            </StepperContext.Provider>
        );
    };
