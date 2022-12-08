import { configureStore } from "@reduxjs/toolkit";
import { companyForm } from "./companyForm";
import { contactPersonForm } from "./contactPersonForm";

export const store = configureStore({
    reducer: {
        ...companyForm.register(),
        ...contactPersonForm.register(),
    },
});
