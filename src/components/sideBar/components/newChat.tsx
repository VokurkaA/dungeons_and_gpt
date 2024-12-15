import { IconButton, Tooltip, useTheme as useMuiTheme } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useContext } from "react";
import { UserDataContext } from "../../hooks/userDataContext";
import GameData from "../../interfaces/gameData";

const NewChat = () => {
    const { setUserData } = useContext(UserDataContext);
    const muiTheme = useMuiTheme();
    
    const handleClearAndReload = () => {
        localStorage.clear();
        setUserData({} as GameData);
        window.location.reload();
    };

    return (
        <Tooltip className="aspect-square w-fit" title="Start a new story">
            <IconButton
                onClick={handleClearAndReload}
                sx={{
                    transition: 'all 0.3s',
                    color: muiTheme.palette.text.primary,
                    '&:hover': {
                        backgroundColor: muiTheme.palette.action.hover,
                        transform: 'scale(1.1)',
                    },
                }}
                size="medium"
                aria-label="new adventure"
            >
                <DeleteOutline />
            </IconButton>
        </Tooltip>
    );
};

export default NewChat;