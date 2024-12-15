import { LinearProgress, Box, Typography } from '@mui/material';
import { amber, green, red } from '@mui/material/colors';
import { useContext } from 'react';
import { UserDataContext } from '../../hooks/userDataContext';
export default function HealthBar() {
    const {userData} = useContext(UserDataContext);
    const healthValue = Math.min(Math.max(userData.health, 0), 100);

    const getHealthColor = () => {
        if (healthValue <= 20) return red[500];
        if (healthValue <= 50) return amber[500];
        return green[500];
    };

    return (
        <Box className="w-full max-w-sm p-4 rounded-lg shadow-md bg-gray-800">
            <div className="flex items-center justify-between mb-2">
                <Typography
                    variant="h6"
                    className="text-white font-semibold"
                >
                    Health
                </Typography>
                <Typography
                    variant="body1"
                    className="text-white"
                >
                    {healthValue}%
                </Typography>
            </div>
            <LinearProgress
                variant="determinate"
                value={healthValue}
                className="h-2 rounded-full"
                sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: getHealthColor(),
                        transition: 'transform 0.4s ease-in-out, background-color 0.4s ease-in-out'
                    }
                }}
            />
        </Box>
    );
}