import { Box, Typography, Chip } from '@mui/material';
import { useContext } from 'react';
import { UserDataContext } from '../../hooks/userDataContext';
export default function Inventory() {
    const {userData} = useContext(UserDataContext);

    return (
        <Box className="max-w-sm p-4 rounded-lg shadow-md bg-gray-800 space-y-2">
            <Typography
                variant="h6"
                className="text-white font-semibold"
            >
                Inventory
            </Typography>
            <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                {userData && userData.inventory.map((item, index) => (
                    <Chip
                        key={index}
                        label={item}
                        className="text-gray-300 bg-gray-700 transition-colors duration-200 hover:bg-gray-600 hover:text-white"
                        size="medium"
                    />
                ))}
            </div>
        </Box>
    );
}