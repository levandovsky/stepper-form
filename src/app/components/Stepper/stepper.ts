import { CompanyForm } from "@app/views/CompanyForm/CompanyForm";
import { ContactPersonForm } from "@app/views/ContactPersonForm/ContactPersonForm";
import { createRoutableStepper, Step } from "@stepper/Stepper";

export const steps: Step[] = [
    {
        path: "/company",
        name: "Company Info",
        component: CompanyForm,
    },
    {
        path: "/contact-person",
        name: "Contact Person",
        component: ContactPersonForm,
    },
];

export const { StepperProvider, renderSteps } = createRoutableStepper(steps);
