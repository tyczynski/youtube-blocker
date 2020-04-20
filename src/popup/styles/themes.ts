export const light = {
  type: 'light',
  color: {
    text: {
      normal: '#202124',
      faded: '#6e6e6e',
    },
    background: {
      normal: '#fff',
      accent: '#f1f3f4',
    },
    border: {
      normal: '#dddddd',
    },
    states: {
      red: '#eb003f',
    },
    custom: {},
  },
};

light.color.custom = {
  badge: {
    background: light.color.background.normal,
  },
  content: {
    background: light.color.background.accent,
  },
};

export const dark = {
  type: 'dark',
  color: {
    text: {
      normal: '#ffffff',
      faded: '#626066',
    },
    background: {
      normal: '#1c1e23',
      accent: '#26252b',
    },
    border: {
      normal: '#2c2e35',
    },
    states: {
      red: '#eb003f',
    },
    custom: {
      badge: {
        background: '#25272E',
      },
      content: {},
    },
  },
};

dark.color.custom.content = {
  background: dark.color.background.normal,
};
