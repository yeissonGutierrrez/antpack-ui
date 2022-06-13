
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/system';
import Login from './components/Login';
import Register from './components/Register';
import { unstable_createMuiStrictModeTheme } from '@mui/material';

const theme = unstable_createMuiStrictModeTheme({
  palette: {
      primary: {
      light: '#00ff00',
      main: '#00ff00',
      dark: '#002884',
      contrastText: '#fff',
      },
      secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
      },
  },
  });

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Login/>
        {/* <Register/> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
