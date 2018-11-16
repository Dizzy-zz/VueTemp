module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    },
    'autoprefixer': 'last 2 versions',
    'cssnano': {
      preset: 'default',
    },
    'postcss-aspect-ratio-mini': {}
  }
};