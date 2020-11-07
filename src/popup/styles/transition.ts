const transition = (...properties: string[]): string => {
  return `
    transition: 0.3s ease;
    transition-property: ${properties.join(', ')};
  `
}

export default transition
