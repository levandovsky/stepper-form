import { store } from "@store/store";
import { colors } from "@styles/variables";
import { Provider } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { StepperProvider, renderSteps } from "./components/Stepper/stepper";
import { StepperProgress } from "./components/Stepper/StepperProgress";
import { GridItem } from "./templates/GridItem";

const AppWrapper = styled.div`
    height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: relative;
    padding: 1rem 2rem;
`;

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }
    
    body {
        background-color: #f5f5f5;
        overflow: hidden;
        color: ${colors.text}
    }
`;

const ApplicationFormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function App() {
    return (
        <Provider store={store}>
            <GlobalStyle />

            <StepperProvider>
                <AppWrapper>
                    <GridItem
                        head={<div>Logo</div>}
                        body={<StepperProgress />}
                    />

                    <GridItem
                        head={
                            <ApplicationFormHeader>
                                <h2>Application Form</h2>
                                <a href="#">Fill out later</a>
                            </ApplicationFormHeader>
                        }
                        body={renderSteps()}
                    />

                    <GridItem></GridItem>
                </AppWrapper>
            </StepperProvider>
        </Provider>
    );
}

export default App;
