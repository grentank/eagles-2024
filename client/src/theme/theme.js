import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    text: {
      primary: 'rgb(0, 0, 0)',
      light: 'rgb(255, 255, 255)',
    },
    background: {
      neutral: 'rgb(255, 255, 255)',
      dark: 'rgb(43, 50, 58)',
      lightBlue: 'rgb(128, 214, 255)',
      darkGreen: 'rgb(22, 64, 46)',
      veryLight: 'rgb(240, 247, 250)',
      lightGreen: 'rgb(128, 255, 198)',
    },
    accent: {
      main: 'rgb(89, 201, 192)',
      background: 'rgb(128, 214, 255)',
      green: 'rgb(128, 255, 198)',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'background.dark' : 'background.neutral',
        color: props.colorMode === 'dark' ? 'text.light' : 'text.primary',
      },
      '*::placeholder': {
        color: 'gray.500',
      },
      h1: {
        color: 'text.primary',
      },
    }),
  },
});

export default theme;
