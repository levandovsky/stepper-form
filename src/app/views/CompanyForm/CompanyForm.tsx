import { useField } from "@form/form/hooks";
import { FC } from "react";
import { companyForm } from "../../store/companyForm";

export const CompanyForm: FC = () => {
    const field = useField(companyForm, "name");

    return (
        <div>
            <h1>Company Form</h1>

            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
            />
        </div>
    );
};
