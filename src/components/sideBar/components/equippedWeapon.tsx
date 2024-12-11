import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserDataContext } from '../../hooks/userDataContext';
export default function EquippedWeapon() {
    const { userData } = useContext(UserDataContext);
    return (
        <Box className="w-full max-w-sm p-4 rounded-lg shadow-md bg-gray-800">
            <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                    <Typography
                        variant="h6"
                        className="text-white font-semibold"
                    >
                        Equipped Weapon
                    </Typography>
                    <Typography
                        variant="body1"
                        className="text-gray-300"
                    >
                        {userData.equippedWeapon && userData.equippedWeapon}
                    </Typography>
                </div>
            </div>
        </Box>
    );
}