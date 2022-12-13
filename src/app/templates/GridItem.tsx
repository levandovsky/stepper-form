import { FC, ReactNode } from "react";
import styled from "styled-components";

export type GridItemProps = {
    head?: ReactNode;
    body?: ReactNode;
};

const GridItemWrapper = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const GridItemHead = styled.header`
    margin-top: 1rem;
`;

const GridItemBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 2;
`;

export const GridItem: FC<GridItemProps> = ({ head, body }) => {
    return (
        <GridItemWrapper>
            <GridItemHead>{head}</GridItemHead>

            <GridItemBody>{body}</GridItemBody>
        </GridItemWrapper>
    );
};
