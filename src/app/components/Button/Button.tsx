import { colors } from "@styles/variables";
import styled from "styled-components";

export const Button = styled.button`
    background-color: ${colors.blue};
    color: #fff;
    border: none;
    border-radius: 999px;

    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 20px;
    transition: background-color, opacity 0.2s ease-in-out;

    &:hover {
        background-color: ${colors.darkBlue};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const ButtonSecondary = styled(Button)`
    background-color: #fff;
    border: 1px solid ${colors.blue};
    color: ${colors.blue};

    &:hover {
        background-color: ${colors.blue};
        color: #fff;

        &:disabled {
            background-color: #fff;
            color: ${colors.blue};
        }
    }
`;
