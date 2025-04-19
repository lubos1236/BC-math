import {useNavigate, useLocation} from 'react-router-dom';
import Block from "../components/Block.tsx";
import Latex from "react-latex-next";
import {useEffect, useState} from "react";
export default function Subject() {
    const navigate = useNavigate();
    const location = useLocation();
    const [latexCode, setLatexCode] = useState<string>('');
    const [ids, setIds] = useState<number[]>([]);
    const [subject, setSubject] = useState<number>(0);

    useEffect(() => {
        let path='';
        switch (Number(location.pathname.substring(6))) {
            case 1:
                path='/latex/subject1.tex';
                setIds([1]);
                setSubject(1);
                break;
            case 2:
                path='/latex/subject2.tex';
                setIds([2]);
                setSubject(2);
                break;
            case 3:
                path='/latex/subject3.tex';
                setIds([1,2]);
                setSubject(3);
                break;
            case 4:
                path='/latex/subject4.tex';
                setIds([1]);
                setSubject(4);
                break;
        }
        fetch(path).then(response=>response.text()).then(data=>setLatexCode(data))
    }, []);

    const navigateToTest = () => {
        navigate('/test', {state: {ids: ids,subject: [subject],count: ids.length,from:"subject"},});
    }

    return (
        <Block>
            <div className="container mx-auto">
                <div className="mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="
                        relative
                        mx-auto
                        max-w-[525px]
                        overflow-hidden
                        rounded-lg
                        bg-card2
                        py-5
                        px-16
                        text-center
                        sm:px-12
                        md:px-[60px]
                        ">
                            <Latex>{latexCode}</Latex>
                            <div className="mb-10 text-center md:mb-16">Téma {Number(location.pathname.substring(6))}</div>
                            <button onClick={navigateToTest}
                            className="bg-background font-bold py-2 px-4 rounded"
                            >Start Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Block>
    )
}
