import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import 'tailwindcss/tailwind.css';
import Chat from './chat';
import './index.css';

const App = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));


  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
    },
  });



  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className='h-svh w-svw flex justify-center items-center'>
        <IconButton color="inherit" onClick={() => setDarkMode(!isDarkMode)}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Chat />
      </div>
    </ThemeProvider>
  );
};

export default App;
