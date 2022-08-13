module.exports = {
  content: ["./src/views/**/*.pug"],
  theme: {
    screens: {
      xs: '320px',
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1441px',
    },
    extend: {
      colors: {
        brown: {
          400: '#C8A880',
        },
        gray: {
          400: '#676767',
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
