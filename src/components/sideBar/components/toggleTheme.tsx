import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Tooltip, useTheme as useMuiTheme } from "@mui/material";
import useTheme from "../hooks/theme";
import { darkTheme } from "../../../themes";

export default function ToggleTheme() {
    const { theme, toggleTheme } = useTheme();
    const muiTheme = useMuiTheme();

    return (
        <Tooltip className="aspect-square w-fit" title={theme === darkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton
                onClick={toggleTheme}
                sx={{
                    transition: 'all 0.3s',
                    color: muiTheme.palette.text.primary,
                    '&:hover': {
                        backgroundColor: muiTheme.palette.action.hover,
                        transform: 'scale(1.1)',
                    },
                }}
                size="medium"
                aria-label="toggle theme"
            >
                {theme === darkTheme ? <LightMode /> : <DarkMode />}
            </IconButton>
        </Tooltip>
    );
}