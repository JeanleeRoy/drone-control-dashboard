/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,vue,story.vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Roboto",
          "Roboto override",
          "ui-sans-serif",
          "system-ui",
          "sans",
        ],
      },
    },
  },
  plugins: [],
};
