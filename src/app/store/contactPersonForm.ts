import { createForm } from "@form/form/form";
import { email, required, phoneNumber } from "@form/validators/default";

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
        validators: [required("Email is required"), email("Email is invalid")],
    },
    phone: {
        value: "",
        validators: [
            required("Phone is required"),
            phoneNumber("Phone is invalid"),
        ],
    },
});
