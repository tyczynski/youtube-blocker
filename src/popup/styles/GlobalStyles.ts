import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }
`

export default GlobalStyles
