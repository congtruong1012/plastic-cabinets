import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, responsiveFontSizes, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { MainContext } from './MainProvider';
/* * need to use module augmentation for the theme to accept the value that just added **/

export default function ThemeProvider({ children }) {
  const { mode } = useContext(MainContext);
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        light: '#4fb9df',
        main: '#24a8d8',
        dark: '#197597',
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
    },
    //edit this to a color pallete your app
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
    typography: {
      fontFamily: ['Mulish'].join(','),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            backgroundColor: mode === 'light' ? '#fafafa' : '#212223',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0px 0px 20px 0px rgb(44 101 144 / 10%)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: mode === 'light' ? '#fff' : '#303030',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            color: '#fff',
          },
          containedInherit: {
            color: '#000',
          },
        },
      },
    },
  });

  // add responsive MUI responsiveFontSize
  theme = responsiveFontSizes(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
