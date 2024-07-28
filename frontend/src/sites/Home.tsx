import {To, useNavigate} from "react-router-dom";

export default function Home() {
    //const cookies = new Cookies();
    const navigate = useNavigate();
    const boxes = [
        {id: 1, text: 'Úvod do Matematickej štatistiky', link: '/tema-1', image: '/Images/Intro.jpg', alt: 'Box One Image', description: 'Nauč sa čo je to matematická štatistika a jej základné pojmy'},
        {id: 2, text: 'Náhodná premenná', link: '/tema-2', image: '/Images/N_p.png', alt: 'Box One Image', description: 'Nauč sa čo je to matematická štatistika a jej základné pojmy'},
        {id: 3, text: 'Popisná štatistika', link: '/tema-3', image: '/Images/Popisna statistika.png', alt: 'Box One Image', description: 'Nauč sa čo je to matematická štatistika a jej základné pojmy'},
        {id: 4, text: 'Bodove a intervalove odhady', link: '/tema-4', image: '/Images/Odhady.jpg', alt: 'Box One Image', description: 'Nauč sa čo je to matematická štatistika a jej základné pojmy'},
    ];
    const largeBox = {id: 5, text: 'Vyskúšaj sa', link: '/test'};

    const handleBoxClick = (link: To) => {
        if (link === '/test')
            navigate(link, { state: { fromPage: 'Home' } });
        else
            navigate(link);
    }


    return (
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
            <div className="container mx-auto">
                <div className="mx-14 grid grid-cols-4 gap-5">
                    {boxes.map((box) => (
                        <button type="button" onClick={() => handleBoxClick(box.link)} key={box.id} className="max-w-sm rounded overflow-hidden shadow-lg scale-75 hover:scale-110 transform transition duration-300">
                            <img className="w-full" src={box.image} alt={box.alt}/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{box.text}</div>
                                    <p className="text-gray-700 text-base">
                                        {box.description}
                                    </p>
                                </div>
                        </button>

                    ))}

                </div>
                <div className="mx-4">
                    <button type="button"
                            onClick={() => handleBoxClick(largeBox.link)}
                            className="text-white
                                bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                                hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
                                dark:focus:ring-blue-800
                                font-medium
                                rounded-lg
                                text-sm
                                px-5
                                py-2.5
                                mt-10
                                h-14
                                text-center
                                w-full

                                me-2 mb-2">{largeBox.text}</button>
                    {/*<div*/}
                    {/*    onClick={() => handleBoxClick(largeBox.link)}*/}
                    {/*    className="cursor-pointer bg-white p-12 rounded-md shadow-md text-center"*/}
                    {/*>*/}
                    {/*    <p className="text-lg font-semibold">{largeBox.text}</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>

    )
}
