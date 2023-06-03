import { createGlobalStyle } from "styled-components"

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
    }
    body {
        background-color: #EBE2E2;
        color: black;
    }

    input, button { 
        font-family: inherit;
    }
`;


export default GlobalStyles;