import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Container, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import 'tailwindcss/tailwind.css';
import Chat from './chat';
import callAPI from './api/api';
const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('start');
        await callAPI('start');
      } catch (error) {
        console.error('Error calling API:', error);
      }
    };

    fetchData();
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#d32f2f',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`h-svh w-svw flex justify-center items-center ${darkMode && 'dark'}`}>
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Chat />
      </div>
    </ThemeProvider>
  );
};

export default App;
