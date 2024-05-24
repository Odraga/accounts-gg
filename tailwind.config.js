/** @type {import('tailwindcss').Config} */
const daisyPlugin = require("daisyui");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyPlugin],
};
