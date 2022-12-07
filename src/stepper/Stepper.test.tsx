import { render } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { createRoutableStepper, useStepperData } from "./Stepper";

const Stepper = createRoutableStepper([
    {
        path: "/test",
        component: () => <div data-testid="test">Test</div>,
    },
    {
        path: "/test2",
        component: () => <div data-testid="test2">Test 2</div>,
    },
]);

const StepperStateSpy = () => {
    const { nextStep, prevStep, currentStep, isLastStep } = useStepperData();

    return (
        <div>
            <div data-testid="current-step">{currentStep}</div>
            <div data-testid="last-step">{JSON.stringify(isLastStep)}</div>
            <button onClick={nextStep}>Next</button>
            <button onClick={prevStep}>Prev</button>
        </div>
    );
};

test("Stepper", async () => {
    const { getByTestId, getByText } = render(
        <Stepper>
            <StepperStateSpy />
        </Stepper>,
    );

    expect(getByTestId("test")).toBeTruthy();
    expect(getByTestId("test").textContent).toBe("Test");
    expect(getByTestId("current-step").textContent).toBe("0");
    expect(getByTestId("last-step").textContent).toBe("false");

    await fireEvent.click(getByText("Next"));

    expect(getByTestId("current-step").textContent).toBe("1");
    expect(getByTestId("test2")).toBeTruthy();
    expect(getByTestId("last-step").textContent).toBe("true");

    // Should not go over max step

    await fireEvent.click(getByText("Next"));

    expect(getByTestId("current-step").textContent).toBe("1");

    await fireEvent.click(getByText("Prev"));

    expect(getByTestId("current-step").textContent).toBe("0");
    expect(getByTestId("test")).toBeTruthy();

    // Should not go to negative step
    await fireEvent.click(getByText("Prev"));

    expect(getByTestId("current-step").textContent).toBe("0");
});
