import { createContext } from 'react';
import GameData from '../interfaces/gameData';

export const UserDataContext = createContext<{
    userData: GameData;
    setUserData: React.Dispatch<React.SetStateAction<GameData>>;
}>({ userData: {} as GameData, setUserData: () => { }});