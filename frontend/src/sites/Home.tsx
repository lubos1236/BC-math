import {To, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../components/AuthProvider.tsx";
import Block from "../components/Block.tsx";
import TestSelection from "../components/TestSelection.tsx";
import {Assignment} from "../utils/assignmentUtils.ts";

export interface Theme {
    id: number
    title: string
    text: string
    assignment_ids?: Assignment[]
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

    },[]);

    const handleBoxClick = (link: To, data :Theme) => {
        navigate(link);
        navigate(link, {state: {data:data},});
    }

    return (
        <Block>
            <div className="container mx-auto">
                <div className="mx-0 grid grid-cols-4 gap-0">
                    {data.map((box) => (
                        <button type="button" onClick={() => handleBoxClick('/tema-'+box.id,box)} key={box.id}
                                className="max-w-sm rounded overflow-hidden shadow-lg scale-75 hover:scale-110 transform transition duration-300 bg-light-card2 dark:bg-dark-card2">
                             {/*<img className="w-full" src={box.image} alt={box.alt}/>*/}
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{box.title}</div>
                                {/*<p className="text-base">*/}
                                {/*    {box.text}*/}
                                {/*</p>*/}
                            </div>
                        </button>

                    ))}
                </div>


                <div className="mx-4">
                    <TestSelection/>
                </div>
            </div>
        </Block>

    )
}
