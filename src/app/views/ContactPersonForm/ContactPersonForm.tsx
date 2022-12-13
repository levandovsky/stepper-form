import { useControl } from "@form/form/hooks";
import { contactPersonForm } from "@store/contactPersonForm";
import { FC } from "react";
import { CardBody, CardHeader, CardTitle } from "../../components/Card/Card";
import { Field } from "../../components/Field/Field";
import { StepCard } from "../../components/StepCard/StepCard";

export const ContactPersonForm: FC<{ path: string }> = ({ path }) => {
    const nameControl = useControl(contactPersonForm, "name");
    const lastnameControl = useControl(contactPersonForm, "lastname");
    const emailControl = useControl(contactPersonForm, "email");
    const phoneControl = useControl(contactPersonForm, "phone");
    const valid = nameControl.valid && lastnameControl.valid && emailControl.valid && phoneControl.valid;

    return (
        <StepCard path={path} nextDisabled={!valid}>
            <CardHeader>
                <CardTitle>Contact Person Form</CardTitle>
            </CardHeader>

            <CardBody>
                <Field
                    name="Name"
                    type="text"
                    value={nameControl.value}
                    onChange={nameControl.setValue}
                    errors={nameControl.errors}
                    onBlur={nameControl.validate}
                />

                <Field
                    name="Lastname"
                    type="text"
                    value={lastnameControl.value}
                    onChange={lastnameControl.setValue}
                    errors={lastnameControl.errors}
                    onBlur={lastnameControl.validate}
                />

                <Field
                    name="Email"
                    type="email"
                    value={emailControl.value}
                    onChange={emailControl.setValue}
                    errors={emailControl.errors}
                    onBlur={emailControl.validate}
                />
                
                <Field
                    name="Phone"
                    type="tel"
                    value={phoneControl.value}
                    onChange={phoneControl.setValue}
                    errors={phoneControl.errors}
                    onBlur={phoneControl.validate}
                />
            </CardBody>
        </StepCard>
    );
};
