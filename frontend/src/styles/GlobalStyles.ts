import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 20px;
        font-family: Arial, sans-serif;
        font-weight: bold;

        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -moz-text-size-adjust: none; 
        -o-text-size-adjust: none;

        overflow-y: scroll;
        overflow-x: hidden;
    }
    body {
        background-color: #15171c;
        color: #FFFFFF;
    }

    input, button { 
        font-family: inherit;
    }
`;

export default GlobalStyles;
