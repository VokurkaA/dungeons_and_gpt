import 'tailwindcss/tailwind.css';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './themes';

interface StatsProps {
    isDarkMode: boolean
    health: string
    inventory: string[]
    equippedWeapon: string
}
const Stats: React.FC<StatsProps> = ({ isDarkMode, health, inventory, equippedWeapon }) => {

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <div className="">
                <div className="">
                    <Card text="Health" value={health} />
                    <Card
                        text="Inventory"
                        value={
                            inventory.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {inventory.map((item, index) => (
                                        <li key={index} className="text-lg">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                ''
                            )
                        }
                    />
                    <Card text="Equipped Weapon" value={equippedWeapon || 'None'} />
                </div>
            </div>
        </ThemeProvider>
    );
};

interface cardProps{
    text: string
    value: string | JSX.Element;
}
const Card: React.FC<cardProps> = ({ text, value }) => {
    return (
        <div className="p-4 border rounded-lg shadow-sm w-64 bg-gray-50">
            <p className="text-xl font-bold">{text}</p>
            <div className="mt-2">{value}</div>
        </div>
    );
};

export default Stats;
