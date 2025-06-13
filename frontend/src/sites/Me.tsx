import Block from "../components/Block.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../components/AuthProvider.tsx";
import PaginatedTable from "../components/PaginatedTable.tsx";

export type ThemeStats = {
    theme_title?: string;
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
    created_at: string;
    themes: ThemeStats[];
};

export default function Me() {
    const [data, setData] = useState<UserTestStats[]>([]);
    const auth = useContext(AuthContext);

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
    const formattedTableData = [...data].reverse().map((test, index) => ({
        id: index + 1,
        created_at: new Date(test.created_at).toLocaleString(),
        success_rate: `${test.success_rate.toFixed(2)}%`,
        themes: test.themes.map(t => t.theme_title ?? `Téma #${t.theme}`).join(', '),
    }));




    useEffect(() => {
        console.log(data);
    }, [data]);


    return (
        <Block>
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-light-card dark:bg-dark-card2 rounded-lg p-4 sm:p-6 shadow">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">Tvoje štatistiky</h2>
                    <ul className="space-y-2 sm:space-y-4 text-base sm:text-lg">
                        <li><strong>Počet ukončených testov:</strong> {data.length}</li>
                        <li><strong>Priemerný dosiahnutý výsledok:</strong> {getAverageSuccessRate(data).toFixed(2)}%</li>
                    </ul>

                    <div className="my-6 border-t border-gray-300 dark:border-gray-600" />

                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">Posledný test</h2>
                    <ul className="space-y-2 sm:space-y-4 text-base sm:text-lg">
                        <li><strong>Dátum:</strong> {data.length > 0 ? data[data.length - 1].created_at : 'N/A'}</li>
                        <li><strong>Počet správnych odpovedí:</strong> {data.length > 0 ? data[data.length - 1].themes.reduce((acc, theme) => acc + theme.r_count, 0) : 0}</li>
                        <li><strong>Počet nesprávnych odpovedí:</strong> {data.length > 0 ? data[data.length - 1].themes.reduce((acc, theme) => acc + theme.w_count, 0) : 0}</li>
                        <li><strong>Dosiahnutý výsledok:</strong> {data.length > 0 ? data[data.length - 1].success_rate.toFixed(2) : 0}%</li>
                        <li><strong>Písané z tém:</strong></li>
                        {data.length > 0 ? (
                            data[data.length - 1].themes.map((theme) => (
                                <li key={theme.id} className="p-3 rounded-lg bg-light-background dark:bg-dark-background shadow-sm">
                                    <div className="font-semibold text-primary">
                                        {theme.theme_title ?? `Téma #${theme.theme}`}
                                    </div>
                                    <div className="text-sm sm:text-base text-muted-foreground ml-2">
                                        ✅ Správne: <span className="text-green-600 font-medium">{theme.r_count}</span>,
                                        ❌ Nesprávne: <span className="text-red-600 font-medium">{theme.w_count}</span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>Žiadne témy</li>
                        )}
                    </ul>
                </div>

                <div className="my-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">História testov</h2>
                    <div className="overflow-x-auto w-full">
                        <PaginatedTable
                            data={formattedTableData}
                            columns={[
                                { header: 'Test #', accessor: 'id' },
                                { header: 'Dátum', accessor: 'created_at' },
                                { header: 'Úspešnosť', accessor: 'success_rate' },
                                { header: 'Témy', accessor: 'themes' },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </Block>
    );


}
