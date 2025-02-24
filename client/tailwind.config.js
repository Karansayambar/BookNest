/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Customize breakpoints for multiple devices
      screens: {
        sm: "640px", // Small devices (phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (laptops)
        xl: "1280px", // Extra large devices (desktops)
        "2xl": "1536px", // Extra extra large devices (large desktops)
      },
      // Extend default colors, fonts, etc.
      colors: {
        primary: "#4F46E5", // Custom primary color
        secondary: "#10B981", // Custom secondary color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom font family
      },
    },
  },
  plugins: [],
};
