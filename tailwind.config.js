/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-highlightjs"),
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  theme: {
    hljs: {
      theme: "atom-one-dark",
    },
  },
};
