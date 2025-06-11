import {useNavigate, useLocation} from 'react-router-dom';
import Block from "../components/Block.tsx";
import LatexComponent from "../components/LatexComponent";
import {useEffect, useState} from "react";
import {Theme} from "./Home.tsx";
export default function Subject() {
    const navigate = useNavigate();
    const location = useLocation();
    const [latexCode, setLatexCode] = useState<string>('');
    /*const [ids, setIds] = useState<number[]>([]);
    const [subject, setSubject] = useState<number>(0);*/
    const data:Theme = location.state.data;

    useEffect(() => {
        setLatexCode(data.text);
    }, []);

    const navigateToTest = () => {
        console.log(data);
        //navigate('/test', {state: {ids: ids,subject: [subject],count: ids.length,from:"subject"},});
        navigate('/test', {state: {ids: data.assignment_ids ,subject: data.id+1,count: data.assignment_ids.length,from:"subject"},});
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
                            <LatexComponent markDown={latexCode}/>
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
