import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Načítame predvoľby z localStorage pred renderovaním komponentu.
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            className="py-2 rounded bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text transition-colors duration-300"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
            {darkMode ? 'Vypnúť' : 'Zapnúť'} Dark Mode
        </button>
    );
}
