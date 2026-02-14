module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xl-nav': '1160px', // custom breakpoint
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        customYellow: "rgba(240, 223, 32, 1)",
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        scaleIn: 'scaleIn 0.6s ease-in-out',
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
