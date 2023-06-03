import styled from 'styled-components';

export const StyledText = styled.span`
    font-weight: 700;
    font-family: 'inter';
    color: ${(props) => props.theme.colors.text};
`;

export const StyledHeaderText = styled(StyledText)`
    font-size: 1.5rem;
`;