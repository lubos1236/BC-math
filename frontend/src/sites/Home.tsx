import {To, useNavigate} from "react-router-dom";
import Block from "../components/Block.tsx";
import TestSelection from "../components/TestSelection.tsx";

export default function Home() {
    const navigate = useNavigate();
    const boxes = [
        {
            id: 1,
            text: 'Úvod do Matematickej štatistiky',
            link: '/tema-1',
            image: '/Images/Intro.jpg',
            alt: 'Box One Image',
            description: 'Nauč sa čo je to matematická štatistika a jej základné pojmy'
        },
        {
            id: 2,
            text: 'Náhodná premenná',
            link: '/tema-2',
            image: '/Images/N_p.png',
            alt: 'Box One Image',
            description: 'Nauč sa čo je to matematická štatistika a jej základné pojmy'
        },
        {
            id: 3,
            text: 'Popisná štatistika',
            link: '/tema-3',
            image: '/Images/Popisna statistika.png',
            alt: 'Box One Image',
            description: 'Nauč sa čo je to matematická štatistika a jej základné pojmy'
        },
        {
            id: 4,
            text: 'Bodove a intervalove odhady',
            link: '/tema-4',
            image: '/Images/Odhady.jpg',
            alt: 'Box One Image',
            description: 'Nauč sa čo je to matematická štatistika a jej základné pojmy'
        },
    ];

    const handleBoxClick = (link: To) => {
        navigate(link);
    }


    return (
        <Block>
            <div className="container mx-auto">
                <div className="mx-0 grid grid-cols-4 gap-0">
                    {boxes.map((box) => (
                        <button type="button" onClick={() => handleBoxClick(box.link)} key={box.id}
                                className="max-w-sm rounded overflow-hidden shadow-lg scale-75 hover:scale-110 transform transition duration-300 bg-card2">
                            <img className="w-full" src={box.image} alt={box.alt}/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{box.text}</div>
                                <p className="text-base">
                                    {box.description}
                                </p>
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
