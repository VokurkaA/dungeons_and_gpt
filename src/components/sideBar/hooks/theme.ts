import { useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../../../themes';

const useTheme = () => {
    const getPreferredThemeMode = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    };

    const getInitialThemeMode = () => {
        const savedThemeMode = localStorage.getItem('theme');
        if (savedThemeMode) {
            return savedThemeMode;
        }
        return getPreferredThemeMode();
    };

    const [themeMode, setThemeMode] = useState(getInitialThemeMode);

    useEffect(() => {
        localStorage.setItem('theme', themeMode);
        if (themeMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
    };

    const theme = themeMode === 'dark' ? darkTheme : lightTheme;

    return { theme, toggleTheme };
};

export default useTheme;