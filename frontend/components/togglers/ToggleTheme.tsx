'use client';
import { Moon, Sun } from 'lucide-react';
import { DashboardHook } from '../context/Dashboardprovider';
const ThemeToggle = () => {
    const { theme, setTheme } = DashboardHook();

    const handleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={handleTheme}
            className="px-4 py-2 w-full"
        >
            {theme === 'dark' ? (
                <div className="flex items-center">
                    <h2 className="mr-1 font-medium">Light</h2>
                    <Sun />
                </div>
            ) : (
                <div className="flex items-center">
                    <h2 className="mr-1 font-medium">Dark</h2>
                    <Moon />
                </div>
            )}
        </button>
    );
};

export default ThemeToggle;
