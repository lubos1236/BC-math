import {useNavigate, useLocation} from 'react-router-dom';
import Block from "../components/Block.tsx";
import MarkdownComponent from "../components/MarkdownComponent.tsx";
import {useEffect, useState} from "react";
import {Theme} from "./Home.tsx";
export default function Subject() {
    const navigate = useNavigate();
    const location = useLocation();
    const [latexCode, setLatexCode] = useState<string>('');
    const data:Theme = location.state.data;

    useEffect(() => {
        setLatexCode(data.text);
    }, []);

    const navigateToTest = () => {

        navigate('/test', {state: {ids: data.assignment_ids ,subject: [data.id],count: 2,from:"subject"},});
    }

    return (
        <Block>
            <div className="container mx-auto">
                <div className="mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="
                        relative
                        mx-auto
                        overflow-hidden
                        rounded-lg
                        bg-light-background
                        dark:bg-dark-background
                        py-5
                        px-16
                        sm:px-12
                        md:px-[60px]
                        ">
                            <MarkdownComponent markDown={latexCode}/>
                            <button onClick={navigateToTest}
                            className="bg-light-card2 dark:bg-dark-card2 font-bold py-2 px-4 rounded block mx-auto text-xl"
                            >Spustiť Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Block>
    )
}
