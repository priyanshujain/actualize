import { Inter } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#16463F',
    },
    secondary: {
      main: '#16463F',
    },
    background: {
			default: '#fff',
		},
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
