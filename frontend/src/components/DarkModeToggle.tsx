import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() =>
        localStorage.getItem('theme') === 'dark'
    );

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
            className="p-2 rounded bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
            onClick={() => setDarkMode(!darkMode)}
        >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
    );
}
