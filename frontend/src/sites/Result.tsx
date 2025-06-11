import Block from "../components/Block.tsx";
import {PieChart} from "@mui/x-charts";
import {useLocation} from "react-router-dom";
import {Assignment, checkSolution} from "../utils/assignmentUtils.ts";
import LatexComponent from "../components/LatexComponent.tsx";


export default function Result() {
    const location = useLocation();
    const successRate = location.state?.successRate || 0;
    const assignments: Assignment[] = location.state?.assignments;
    const data = [
        {id: 'Correct', value: successRate, color: 'green'},
        {id: 'Incorrect', value: 100 - successRate, color: 'red'},
    ];
    console.log(assignments);
    return (
        <Block>
            <p>Výsledok</p>
            <div className="relative w-[400px] h-[400px] mx-auto">
                <PieChart series={[{
                    data: data,
                    innerRadius: 125,
                    color: 'data.color',
                }]}/>
                <div
                    className="absolute top-1/2 left-[40%] -translate-x-1/2
                     -translate-y-1/2 text-lg font-bold
                     text-center">
                    <div className="text-8xl">
                        {Math.floor(successRate)}%
                    </div>
                </div>
            </div>


            {assignments.map((assignment, index) => {
                // Skontrolujeme, či je odpoveď správna
                const isCorrect = checkSolution(assignment, assignment.submittedSolution);

                return (
                    <div key={assignment.id ?? index} className="w-full mb-4 min-h-20 border-2 border-light-card2 dark:border-dark-card2 rounded-lg ">
                        <h1 className="p-2 text-xl text-center">Úloha: {index + 1}</h1>
                        <p className="p-2 text-center">Zadanie: <LatexComponent markDown={assignment.task}/></p>
                        <div className="flex row p-2 m-2">
                            {/* Zobrazenie generovaného riešenia */}
                            <p className="p-2 flex-1 border">
                                Riešenie: {' ' + checkSolution(assignment, assignment.submittedSolution, true)}
                            </p>

                            {/* Kontrola správnosti odpovede a priradenie farby */}
                            {isCorrect ? (
                                <p className="p-2 flex-1 border text-green-500">
                                    Vaše riešenie: {' ' + assignment.submittedSolution}
                                </p>
                            ) : (
                                <p className="p-2 flex-1 border text-red-500">
                                    Vaše riešenie: {' ' + assignment.submittedSolution}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </Block>
    );
}
