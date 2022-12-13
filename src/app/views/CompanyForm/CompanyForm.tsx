import { useControl } from "@form/form/hooks";
import { companyForm } from "@store/companyForm";
import { FC } from "react";
import { CardBody, CardHeader, CardTitle } from "../../components/Card/Card";
import { Field } from "../../components/Field/Field";
import { StepCard } from "../../components/StepCard/StepCard";

export const CompanyForm: FC<{ path: string }> = ({ path }) => {
    const nameControl = useControl(companyForm, "name");
    const codeControl = useControl(companyForm, "code");
    const coutnryOfRegistrationControl = useControl(
        companyForm,
        "countryOfRegistration"
    );
    const valid = nameControl.valid && codeControl.valid && coutnryOfRegistrationControl.valid;

    return (
        <StepCard path={path} nextDisabled={!valid}>
            <CardHeader>
                <CardTitle>Company Form</CardTitle>
            </CardHeader>

            <CardBody>
                <Field
                    name="Company name"
                    type="text"
                    value={nameControl.value}
                    onChange={nameControl.setValue}
                    errors={nameControl.errors}
                    onBlur={nameControl.validate}
                />

                <Field
                    name="Company code"
                    type="text"
                    value={codeControl.value}
                    onChange={codeControl.setValue}
                    errors={codeControl.errors}
                    onBlur={codeControl.validate}
                />

                <Field
                    name="Country of registration"
                    type="text"
                    value={coutnryOfRegistrationControl.value}
                    onChange={coutnryOfRegistrationControl.setValue}
                    errors={coutnryOfRegistrationControl.errors}
                    onBlur={coutnryOfRegistrationControl.validate}
                />
            </CardBody>
        </StepCard>
    );
};
