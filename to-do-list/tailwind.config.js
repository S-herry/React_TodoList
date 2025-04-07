/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EEF7FF", // 基本的背景色
        secondary: "#7B90C1", // 主要顏色
        primary_title: "#8794BF", // 主要文字顏色
        secondary_content: "#97A3BC", //  提示 小字 橫線
      },
      backgroundImage: {
        "gradient-blue-light": "linear-gradient(to bottom, #EEF7FF, #E0E2FF)",
      },
    },
  },
  plugins: [],
};
