import { css } from 'styled-components'

/**
 * Predefined transition with initial values
 *
 * @param properties - list of CSS properties to transition
 */
export const transition = (...properties: string[]) => css`
  transition: 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
  transition-property: ${properties.join(', ')};
`
