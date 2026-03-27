/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontfamily: {
        Inria: ["Inria Sans", "sans-serif"]
      },
    },
  },
  variants: {
    // Content
  },
  
  plugins: [require('daisyui')],
};

// // Tailwind.config.js
// module.exports = {
//   content: ["./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"],
//   presets: [require("@relume_io/relume-tailwind")],
// };
