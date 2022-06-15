module.exports = {
  theme: {
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
          200: "#367CFF",
          300: "#88A2D2",
          400: "#3E5786",
          600: "#1E394F",
        },
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

      backgroundImage: {
        beach: "url('~/assets/images/photos/beach.jpg')",
        paris: "url('~/assets/images/photos/paris.jpg')",
        "new-york": "url('~/assets/images/photos/new-york.jpg')",
        london: "url('~/assets/images/photos/london.jpg')",
        dubai: "url('~/assets/images/photos/dubai.jpg')",
        "san-francisco": "url('~/assets/images/photos/san-francisco.jpg')",
        cancun: "url('~/assets/images/photos/cancun.jpg')",
      },

      gridTemplateRows: {
        "gallery-mobile": "repeat(3, minmax(0, 140px))",
        "gallery-desktop": "repeat(2, minmax(0, 280px))",
      },
    },
  },

  plugins: [],
};
