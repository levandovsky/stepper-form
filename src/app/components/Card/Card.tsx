import { motion } from "framer-motion";
import styled from "styled-components";

export const Card = styled(motion.div)`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 700px;
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

export const CardTitle = styled.h2`
    font-size: 20px;
    font-weight: 500;
    margin: 0;
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;
