import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import 'tailwindcss/tailwind.css';
import Chat from './chat';
import './index.css';
import Stats from './stats';
import { darkTheme, lightTheme } from './themes';

const App = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));
  const [health, setHealth] = useState('100');
  const [inventory, setInventory] = useState(['Potion', 'Shield']);
  const [equippedWeapon, setEquippedWeapon] = useState('Sword');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className='h-svh w-svw flex justify-center items-center'>
        <IconButton color="inherit" onClick={() => setDarkMode(!isDarkMode)}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Chat />
        <>
          <Stats isDarkMode={isDarkMode} health={health} inventory={inventory} equippedWeapon={equippedWeapon}></Stats>
        </>
      </div>
    </ThemeProvider>
  );
};

export default App;
