import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthProvider.tsx";

interface Theme {
    id: number;
    title: string;
    text: string;
}

export default function TestSelection() {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [selectedThemes, setSelectedThemes] = useState<Record<number, boolean>>({});
    const [sliderValue, setSliderValue] = useState<string>("3");
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await fetch("http://localhost:8000/api/theme", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            if (response.ok) {
                const data: Theme[] = await response.json();
                setThemes(data);
                const initialSelection: Record<number, boolean> = {};
                data.forEach((theme) => {
                    initialSelection[theme.id] = false;
                });
                setSelectedThemes(initialSelection);
            }
        };

        fetchThemes();
    }, [auth.token]);

    const handleCheckboxChange = (id: number, checked: boolean) => {
        setSelectedThemes((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const handleButtonClick = () => {
        const selectedIds = Object.entries(selectedThemes)
            .filter(([, checked]) => checked)
            .map(([id]) => Number(id));

        const subject = selectedIds.length > 0
            ? selectedIds
            : themes.map((theme) => theme.id);
        navigate('/test', {
            state: {
                subject,
                count: sliderValue,
                from: "home"
            },
        });
    };

    return (
        <div className="border-2 border-dark-background dark:border-light-background px-4 py-3 rounded-lg">
            <button
                type="button"
                onClick={handleButtonClick}
                className="text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background font-medium rounded-lg py-2.5 h-14 text-center w-full mb-4"
            >
                Vyskúšaj sa
            </button>

            <div className="text-center mb-4">
                <p className="mb-2">Počet príkladov na tému: {sliderValue}</p>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(e.target.value)}
                    className="w-full"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {themes.map((theme) => (
                    <label
                        key={theme.id}
                        className="flex items-center px-4 py-3 border rounded cursor-pointer border-light-background dark:border-dark-background bg-light-card2 dark:bg-dark-card2 hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                    >
                        <input
                            type="checkbox"
                            checked={selectedThemes[theme.id] || false}
                            onChange={(e) => handleCheckboxChange(theme.id, e.target.checked)}
                            className="w-4 h-4 rounded accent-blue-600"
                        />
                        <span className="ml-3 text-sm font-medium text-light-text dark:text-dark-text break-words">
                {theme.title}
            </span>
                    </label>
                ))}
            </div>


            <div className="text-xs text-red-500 text-center">
                *Ak výber neuskutočníte, tak budú vybrané všetky témy
            </div>
        </div>
    );
}
