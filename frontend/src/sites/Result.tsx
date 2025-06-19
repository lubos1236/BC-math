import Block from "../components/Block.tsx";
import {PieChart} from "@mui/x-charts";
import {useLocation} from "react-router-dom";
import {Assignment, checkSolution} from "../utils/assignmentUtils.ts";
import MarkdownComponent from "../components/MarkdownComponent.tsx";


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
            <p className="text-center text-xl font-semibold mb-4">Výsledok</p>

            <div className="relative w-full max-w-[400px] aspect-square mx-auto">
                <PieChart
                    series={[
                        {
                            data: data,
                            innerRadius: 125,
                            color: 'data.color',
                        },
                    ]}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-center">
                    <div className="text-5xl sm:text-6xl md:text-8xl">
                        {Math.floor(successRate)}%
                    </div>
                </div>
            </div>


            <div className="mt-6 space-y-6">
                {assignments.map((assignment, index) => {
                    const isCorrect = checkSolution(assignment, assignment.submittedSolution);

                    return (
                        <div
                            key={assignment.id ?? index}
                            className="w-full border-2 border-light-card2 dark:border-dark-card2 rounded-lg p-4"
                        >
                            <h1 className="text-xl text-center mb-2">Úloha: {index + 1}</h1>

                            <div className="text-center mb-4">
                                Zadanie:
                                <MarkdownComponent markDown={assignment.task} />
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <p className="flex-1 border rounded p-2">
                                    Riešenie: {' ' + checkSolution(assignment, assignment.submittedSolution, true)}
                                </p>

                                <p
                                    className={`flex-1 border rounded p-2 ${
                                        isCorrect ? 'text-green-500' : 'text-red-500'
                                    }`}
                                >
                                    Vaše riešenie: {' ' + assignment.submittedSolution}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Block>
    );

}
