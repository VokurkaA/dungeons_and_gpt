import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import 'tailwindcss/tailwind.css';
import Chat from './chat';
import './styles/index.css';
import Stats from './stats';
import { darkTheme, lightTheme } from './styles/themes';

const App = () => {
  const [data, setData] = useState({ health: 100, inventory: [], equippedWeapon: '' });
  const [isDarkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);


  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className='h-svh w-svw flex justify-center items-center'>
        <IconButton color="inherit" onClick={() => setDarkMode(!isDarkMode)}>
          {isDarkMode ? <DarkMode /> : <LightMode />}
        </IconButton>
        <Chat setUserData={setData}/>
        <Stats isDarkMode={isDarkMode} userdata={data}></Stats>
      </div>
    </ThemeProvider>
  );
};

export default App;
