import { To, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider.tsx";
import Block from "../components/Block.tsx";
import TestSelection from "../components/TestSelection.tsx";
import { Assignment } from "../utils/assignmentUtils.ts";

export interface Theme {
    id: number;
    title: string;
    text: string;
    assignment_ids?: Assignment[];
}

export default function Home() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [data, setData] = useState<Theme[]>([]);

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await fetch('http://localhost:8000/api/theme', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to load themes');
            }
            setData(await response.json());
        };
        fetchThemes();
    }, []);

    const handleBoxClick = (link: To, data: Theme) => {
        console.log(data);
        navigate(link, { state: { data: data } });
    };

    return (
        <Block>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {data.map((box) => (
                        <button
                            type="button"
                            onClick={() => handleBoxClick('/tema-' + box.id, box)}
                            key={box.id}
                            className="rounded overflow-hidden shadow-lg bg-light-card2 dark:bg-dark-card2 transform transition duration-300 hover:scale-105 text-left w-full h-full"
                        >
                            <div className="px-4 py-4 h-full flex flex-col justify-between">
                                <div className="font-bold text-xl mb-2 break-words">{box.title}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mb-8">
                    <TestSelection />
                </div>
            </div>
        </Block>
    );
}
