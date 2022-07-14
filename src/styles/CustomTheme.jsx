import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1ec2a3',
    },
    secondary: {
      main: '#6c757d',
    },
    error: {
      main: '#FF2419',
    },
    success: {main: '#43b760'},
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiInputBase: {
      root: {
        textAlign: 'center',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
  },
});

const CustomTheme = ({children}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default CustomTheme;
