module.exports = {
  purge: [
    './pages/**/*.md',
    './pages/**/*.mdx',
    './nextra.config.js',
  ],
  theme: {
  },
  plugins: [require('@tailwindcss/typography')],
}
