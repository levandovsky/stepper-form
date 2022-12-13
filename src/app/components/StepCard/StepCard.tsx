import { useAnimation, Variants } from "framer-motion";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useStepperData } from "@stepper/Stepper";
import { Button, ButtonSecondary } from "../Button/Button";
import { Card, CardFooter } from "../Card/Card";

const variants: Variants = {
    previous: {
        y: "40vh",
        opacity: 0,
        zIndex: -1,
    },
    current: {
        y: 0,
        opacity: 1,
        zIndex: 0,
    },
    next: {
        y: "-40vh",
        opacity: 0,
        zIndex: -1,
    },
};

const AbsoluteCard = styled(Card)`
    position: absolute;
    width: 100%;
`;

const StepCardFooter = styled(CardFooter)`
    display: flex;
    justify-content: space-between;

    ${Button} {
        margin-left: auto;
    }

    ${ButtonSecondary} {
        margin-right: auto;
        margin-left: 0;
    }
`;

export type StepCardProps = {
    children: ReactNode | ReactNode[];
    path: string;
    nextDisabled?: boolean;
};

export const StepCard: FC<StepCardProps> = ({
    children,
    path,
    nextDisabled,
}) => {
    const {
        currentStep,
        isLastStep,
        isFirstStep,
        prevStep,
        nextStep,
        getStepByPath,
    } = useStepperData();
    const controls = useAnimation();
    const thisStep = useMemo(() => getStepByPath(path), []);
    const [inTransition, setInTransition] = useState(false);
    const isCurrent = currentStep === thisStep;
    const isPrevious = currentStep === thisStep - 1;
    const isNext = currentStep === thisStep + 1;

    useEffect(() => {
        if (isCurrent) {
            controls.set(variants.current);
            return;
        }

        if (isPrevious) {
            controls.set(variants.previous);
            return;
        }

        if (isNext) {
            controls.set(variants.next);
            return;
        }
    }, []);

    useEffect(() => {
        if (!inTransition) {
            setInTransition(true);
        }

        if (isCurrent) {
            controls.start(variants.current).then(() => {
                setInTransition(false);
            });

            return;
        }

        if (isPrevious) {
            controls.start(variants.previous).then(() => {
                setInTransition(false);
            });

            return;
        }

        if (isNext) {
            controls.start(variants.next).then(() => {
                setInTransition(false);
            });

            return;
        }
    }, [currentStep]);

    return (
        <AbsoluteCard
            animate={controls}
            transition={{
                type: "tween",
                duration: 1,
            }}
        >
            {children}

            <StepCardFooter>
                {!isFirstStep ? (
                    <ButtonSecondary onClick={prevStep} disabled={inTransition}>
                        Prev
                    </ButtonSecondary>
                ) : null}

                {!isLastStep ? (
                    <Button
                        onClick={nextStep}
                        disabled={nextDisabled || inTransition}
                    >
                        Next
                    </Button>
                ) : null}
            </StepCardFooter>
        </AbsoluteCard>
    );
};
