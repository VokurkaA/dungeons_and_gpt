import { CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from './components/sideBar/sidebar';
import useTheme from './components/sideBar/hooks/theme';
import Chat from './components/chat/chat';
import { UserDataContext } from './components/hooks/userDataContext';
import { useState } from 'react';
import GameData from './components/interfaces/gameData';

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
