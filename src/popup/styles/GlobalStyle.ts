import { createGlobalStyle } from 'styled-components'

/**
 * Globals and reset styles
 */
export const GlobalStyle = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  /**
   * 1. 1rem === 10px
   */
  html {
    font-size: 62.5%; /* 1 */
    user-select: none;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }
`
