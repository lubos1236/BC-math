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
        console.log(subject+" "+sliderValue);
        navigate('/test', {
            state: {
                subject,
                count: sliderValue,
                from: "home"
            },
        });
    };

    return (
        <div className="border-2 border-dark-background dark:border-light-background px-3 py-2 rounded-lg">
            <button
                type="button"
                onClick={handleButtonClick}
                className="text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background font-medium rounded-lg py-2.5 h-14 text-center w-full mb-2"
            >
                Vyskúšaj sa
            </button>

            <div className="justify-items-center pt-1 pb-3">
                <p className="text-center">Počet príkladov na tému: {sliderValue}</p>
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

            <div className="grid grid-cols-2 gap-4 pb-3">
                {themes.map((theme) => (
                    <div key={theme.id}>
                        <div className="flex items-center ps-4 border border-light-background dark:border-dark-background rounded">
                            <input
                                id={`theme-${theme.id}`}
                                type="checkbox"
                                checked={selectedThemes[theme.id] || false}
                                onChange={(e) => handleCheckboxChange(theme.id, e.target.checked)}
                                className="w-4 h-4 rounded"
                            />
                            <label
                                htmlFor={`theme-${theme.id}`}
                                className="w-full py-4 ms-2 text-sm font-medium"
                            >
                                {theme.title}
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-xs text-red-500">
                *Ak výber neuskutočníte, tak budú vybrané všetky témy
            </div>
        </div>
    );
}
