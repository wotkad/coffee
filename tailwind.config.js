module.exports = {
  content: ["./src/views/**/*.pug"],
  theme: {
    screens: {
      xs: '320px',
      sm: '375px',
      md: '768px',
      lg: '1337px',
      lg2: '1441px',
      xl: '1580px',
    },
    extend: {
      colors: {
        brown: {
          300: '#F5E7D5',
          400: '#C8A880',
        },
        gray: {
          100: '#D9D9D9',
          200: '#A6A6A6',
          300: '#D9D9D9',
          400: '#676767',
        }
      }
    },
    fontFamily: {
      'heading': ['Jost'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
