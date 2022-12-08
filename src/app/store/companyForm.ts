import { createForm } from "@form/form/form";
import { required } from "@form/validators";

export const companyForm = createForm("company", {
    name: {
        value: "",
        validators: [required("Name is required")],
    },
    code: {
        value: "",
        validators: [required("Code is required")],
    },
    countryOfRegistration: {
        value: "",
        validators: [required("Country of registration is required")],
    },
});