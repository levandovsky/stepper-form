import { createForm } from "@form/form/form";
import { required } from "@form/validators";

export const contactPersonForm = createForm("contactPerson", {
    name: {
        value: "",
        validators: [required("Name is required")],
    },
    lastname: {
        value: "",
        validators: [required("Lastname is required")],
    },
    email: {
        value: "",
        validators: [required("Email is required")],
    },
    phone: {
        value: "",
        validators: [required("Phone is required")],
    },
});
