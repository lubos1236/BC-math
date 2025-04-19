import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function TestSelection() {
    const [box1, setBox1] = useState(false);
    const [box2, setBox2] = useState(false);
    const [box3, setBox3] = useState(false);
    const [box4, setBox4] = useState(false);
    const [sliderValue, setSliderValue] = useState<string>("3");
    const navigate = useNavigate();
    const boxes = [
        {
            id: 1,
            text: 'Úvod do Matematickej štatistiky',
            value: 'theme1',
            function: setBox1,
        },
        {
            id: 2,
            text: 'Náhodná premenná',
            value: 'theme2',
            function: setBox2,
        },
        {
            id: 3,
            text: 'Popisná štatistika',
            value: 'theme3',
            function: setBox3,
        },
        {
            id: 4,
            text: 'Bodove a intervalove odhady',
            value: 'theme4',
            function: setBox4,
        },];

    const handleButtonClick = () => {
        let selected = "";
        if (box1 || box2 || box3 || box4) {
            if (box1) {
                selected += '1';
            }
            if (box2) {
                selected += '2';
            }
            if (box3) {
                selected += '3';
            }
            if (box4) {
                selected += '4';
            }
        } else {
            selected = '1234';
        }
        navigate('/test', {state: {subject: [...selected].map(Number), count: sliderValue, from:"home"},});
    }

    return (
        <div className="border-2 border-background px-3 py-2 rounded-lg">
            <button type="button"
                    onClick={handleButtonClick}
                    className="
                text-[#adadad]
                bg-background
                font-medium
                rounded-lg
                py-2.5
                h-14
                text-center
                w-full
                mb-2">
                Vyskúšaj sa
            </button>

            <div className="justify-items-center pt-1 pb-3">
                <p className="text-center">Počet príkladov na tému: {sliderValue}</p>
                <input type={"range"} min={"1"} max={"5"} step={"1"} value={sliderValue} onChange={(e)=>setSliderValue(e.target.value)}
                className="w-full"/>
            </div>


            <div className="grid grid-cols-2 gap-4 pb-3">
                {boxes.map((box) => (
                    <div key={box.id}>
                        <div className="flex items-center ps-4 border border-background rounded">
                            <input id={box.id.toString()} type="checkbox" value={box.value} name={box.value}
                                   onChange={(e) => {
                                       box.function(e.target.checked)
                                   }}
                                   className="w-4 h-4 rounded "/>
                            <label htmlFor={box.id.toString()}
                                   className="w-full py-4 ms-2 text-sm font-medium">{box.text}</label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-xs text-red-500">*Ak vyber neuskutočníte, tak budu vybrané všetky témy</div>


        </div>
    )

}
