import Block from "../components/Block.tsx";
import {PieChart} from "@mui/x-charts";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../components/AuthProvider.tsx";

export type ThemeStats = {
    id: number;
    theme: number;
    test_id: number;
    r_count: number; // správne odpovede
    w_count: number; // nesprávne odpovede
};

export type UserTestStats = {
    id: number;
    user_id: number;
    success_rate: number;
    themes: ThemeStats[];
};

export default function Me() {
    const [data, setData] = useState<UserTestStats[]>([]);
    const auth = useContext(AuthContext);
    const tmpData = [
        {id: 'Correct', value: 80, color: 'green'},
        {id: 'Incorrect', value: 20, color: 'red'},];

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/test', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    },

                });
                const data = await response.json();
                setData(data);


            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
            console.log()
        };
        fetchAssignments();

    }, [auth.token]);


    const getAverageSuccessRate = (data: UserTestStats[]): number => {
        if (data.length === 0) return 0;
        const total = data.reduce((sum, stat) => sum + stat.success_rate, 0);
        return total / data.length;
    };




    useEffect(() => {
        console.log(data);
    }, [data]);


    return (
        <Block>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Ľavá strana – miesto pre koláčový graf */}
                <div className="w-full md:w-1/2 bg-card2 rounded-lg p-6 shadow">
                    <h2 className="text-xl font-semibold mb-4 text-center">Tvoje výsledky podľa tém</h2>
                    {/* Tu neskôr vložíš koláčový graf */}
                    <div className="relative w-[400px] h-[400px]">
                        <PieChart series={[{
                            data: tmpData,
                            innerRadius: 125,
                            color: 'data.color',
                        }]}/>
                        <div
                            className="absolute top-1/2 left-[40%] -translate-x-1/2
                     -translate-y-1/2 text-lg font-bold
                     text-center">
                            <div className="text-8xl">
                                {80}%
                            </div>
                        </div>
                    </div>

                </div>

                {/* Pravá strana – štatistiky */}
                <div className="w-full md:w-1/2 bg-card2 rounded-lg p-6 shadow">
                    <h2 className="text-xl font-semibold mb-4 text-center">Tvoje štatistiky</h2>
                    <ul className="space-y-4 text-lg">
                        <li><strong>Počet testov:</strong> {/* sem dáš dynamickú hodnotu */} {data.length}</li>
                        <li><strong>Priemerný výsledok:</strong> {/* sem dáš dynamickú hodnotu */} {getAverageSuccessRate(data)}%</li>
                        <li><strong>Najsilnejšia téma:</strong> {/* sem dáš dynamickú hodnotu */} -</li>
                        <li><strong>Najslabšia téma:</strong> {/* sem dáš dynamickú hodnotu */} -</li>
                    </ul>
                </div>
            </div>
        </Block>
    );
}
