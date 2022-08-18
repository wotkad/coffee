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
          300: '#F5E7D5',
          400: '#C8A880',
        },
        gray: {
          300: '#D9D9D9',
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
