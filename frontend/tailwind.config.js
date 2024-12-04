/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#088178", // Red color for primary
        accent: {
          DEFAULT: "#00ff99", // Green accent color
          hover: "#00e187", // Darker green for hover
        },
      },
      screens: {
        window900: "900px",
        tablet640: "640px",
        pc1200: "1200px",
      },
    },
  },
  plugins: [],
};
