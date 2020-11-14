/**
 * Predefined transition with initial values
 *
 * @param properties - list of CSS properties to transition
 */
export const transition = (...properties: string[]) => `
  transition: 0.2s cubic-bezier(.22,.61,.36,1);
  transition-property: ${properties.join(', ')};
`
