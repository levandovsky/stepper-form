import { store } from "./store/store";
import { Provider } from "react-redux";
import { createRoutableStepper } from "../stepper/Stepper";
import { CompanyForm } from "./views/CompanyForm/CompanyForm";
import { ContactPersonForm } from "./views/ContactPersonForm/ContactPersonForm";

const Stepper = createRoutableStepper([
    {
        path: "/company",
        component: CompanyForm,
    },
    {
        path: "/contact-person",
        component: ContactPersonForm,
    },
]);

function App() {
    return (
        <Provider store={store}>
            <Stepper />
        </Provider>
    );
}

export default App;
