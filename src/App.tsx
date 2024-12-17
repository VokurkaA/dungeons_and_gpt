import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import 'tailwindcss/tailwind.css';
import Chat from './chat';
import './styles/index.css';
import Stats from './stats';
import { darkTheme, lightTheme } from './themes';

const App = () => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState<GameData>(JSON.parse(localStorage.getItem('userData') || '{"health": 100, "equippedWeapon": "", "inventory": []}') || { health: 100, equippedWeapon: '', inventory: [] });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='relative flex h-svh w-svw overflow-clip'>
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <Sidebar />
          <Chat />
        </UserDataContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
