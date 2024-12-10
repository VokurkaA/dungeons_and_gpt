import 'tailwindcss/tailwind.css';
import './index.css';
import { Card, LinearProgress, List, ListItem, Typography } from '@mui/material';
import { LocalHospital, Storage, Inventory2, Shield } from '@mui/icons-material';

export default function Stats(props: { isDarkMode: boolean, userdata: { health: number, inventory: string[], equippedWeapon: string } }) {
  return (
    <Card className={`p-4 m-4 ${props.isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} 
      transition-all duration-300 shadow-lg rounded-lg`}>
      
      {/* Health Section */}
      <div className="flex items-center mb-4">
        <LocalHospital className={`mr-2 ${props.isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
        <Typography variant="h6" className="flex-1">
          Health
        </Typography>
        <Typography variant="body1">
          {props.userdata.health}%
        </Typography>
      </div>
      <LinearProgress 
        variant="determinate" 
        value={props.userdata.health}
        className={`mb-6 rounded-full ${props.userdata.health < 30 ? 'color-red-500' : 'color-green-500'}`}
      />

      {/* Equipped Weapon */}
      <div className="flex items-center mb-4">
        <Shield className={`mr-2 ${props.isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <Typography variant="subtitle1" className="flex-1">
          Equipped: {props.userdata.equippedWeapon}
        </Typography>
      </div>

      {/* Inventory Section */}
      <div className="mt-4">
        <div className="flex items-center mb-2">
          <Inventory2 className={`mr-2 ${props.isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <Typography variant="subtitle1">
            Inventory ({props.userdata.inventory.length} items)
          </Typography>
        </div>
        <List className={`bg-opacity-50 rounded-lg ${props.isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {props.userdata.inventory.map((item, index) => (
            <ListItem key={index} className="px-4 py-2 border-b border-opacity-20 last:border-0">
              <Storage className="mr-2" fontSize="small" />
              <Typography variant="body2">{item}</Typography>
            </ListItem>
          ))}
        </List>
      </div>
    </Card>
  );
}