import { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Chat from './components/chat/chat';
import Sidebar from './components/sideBar/sidebar';
import useTheme from './components/sideBar/hooks/theme';
import { UserDataContext } from './components/hooks/userDataContext';
import GameData from './components/interfaces/gameData';
import {getData} from './db/db';

const App = () => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState<GameData>({} as GameData);

  // Load the data from the database
  useEffect(() => {
    getData().then((data) => {
      const GameData: GameData = {} as GameData;
      GameData.health = data.player.health;
      GameData.inventory = data.player.inventory;
      GameData.equippedWeapon = data.player.equipped_weapon;
      setUserData(GameData);
    });
  })

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
