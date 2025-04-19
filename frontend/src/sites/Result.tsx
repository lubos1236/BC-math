import Block from "../components/Block.tsx";
import {PieChart} from "@mui/x-charts";
import {useLocation} from "react-router-dom";
import {Assignment, checkSolution} from "../utils/assignmentUtils.ts";


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
            <p>Result</p>
            <div className="relative w-[400px] h-[400px]">
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
                        {successRate}%
                    </div>
                </div>
            </div>
            {assignments.map((assignment, index) => (
                <div key={assignment.id ?? index}
                    className="w-full mb-4 min-h-20 border-2 border-card2 rounded-lg ">
                    <h1 className="p-2 text-xl text-center">Úloha: {index + 1}</h1>
                    <p className="p-2 text-center">Zadanie:{assignment.task}</p>
                    <div className="flex row p-2 m-2">
                        <p className="p-2 flex-1 border">Riešenie:{' ' + checkSolution(assignment,assignment.submittedSolution,true)}</p>
                        {checkSolution(assignments[0], assignment.submittedSolution) ?
                            <p className="p-2 flex-1 border text-green-500 ">Vaše
                                riešenie:{' ' + assignment.submittedSolution}
                            </p> : <p className="p-2 flex-1 border text-red-500 ">Vaše
                                riešenie:{' ' + assignment.submittedSolution}</p>}
                    </div>
                </div>
            ))}
        </Block>
    );
}
