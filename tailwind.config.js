const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './components/**/*.tsx',
    './pages/**/*.md',
    './pages/**/*.mdx',
    './theme.config.js',
    './styles.css',
  ],
  colors: {
    dark: '#000',
    gray: colors.neutral,
    blue: colors.blue,
    orange: colors.orange,
    green: colors.green,
    red: colors.red,
    yellow: colors.yellow,
    'pink-gradient-start': 'rgba(255, 30, 86, 1)',
  },
  darkMode: 'class',
}
