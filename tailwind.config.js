module.exports = {
  theme: {
    content: ["./node_modules/flowbite/**/*.js"],

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },

    extend: {
      colors: {
        primary: {
          100: "#F6F8FB",
          200: "#367cff",
          400: "#3E5786",
          600: "#1e394f",
        },

        lynch: "#71809d",
        zumthor: "#E3ECFF",
        "dusty-gray": "#979797",
        trout: "#494e61",
        mineshaft: "#212121",
        "catskill-white": "#F6F8FB",
        "east-bay": "#3E5786",
        "dodger-blue": "#367cff",
        "polo-blue": "#88a2d2",
        "link-water": "#CED5F1",
      },

      screens: {
        "4xs": "340px",
        "3xs": "400px",
        "2xs": "480px",
        xs: "560px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1440px",
      },

      fontFamily: {
        cereal: ["Cereal", "sans-serif"],
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
