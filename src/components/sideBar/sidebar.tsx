import EquippedWeapon from "./components/equippedWeapon";
import HealthBar from "./components/healthBar";
import Inventory from "./components/inventory";
import ToggleTheme from "./components/toggleTheme";

export default function Sidebar() {
    return (
        <div className="flex flex-col p-2 h-full w-80 gap-2 select-none">
            <ToggleTheme />
            <HealthBar />
            <EquippedWeapon />
            <Inventory />
        </div>
    );
}