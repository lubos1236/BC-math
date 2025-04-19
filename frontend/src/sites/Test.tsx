import {useEffect, useState, useContext} from "react";
import {AuthContext} from "../components/AuthProvider.tsx";
import {useNavigate, useLocation} from "react-router-dom";
import {Assignment, checkSolution, processAssignments, processAnswers} from "../utils/assignmentUtils.ts";
import Block from "../components/Block.tsx";

export default function Test() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [currentAssignmentIndex, setCurrentAssignmentIndex] = useState(0);
    const [solution, setSolution] = useState("");
    const [currentHintIndex, setCurrentHintIndex] = useState(-1);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const subjects:number[] = location.state.subject;
    const checker=location.state.from==="home";
    const count = location.state.count;
    const ids:number[] = location.state?.ids ||null;// [1];
    const [correctSolutions, setCorrectSolutions] = useState<boolean[]>([]);
    const currentAssignment = assignments[currentAssignmentIndex];


    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/'+(checker? "assignmentsBySubject":"assignments"), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    },

                    body: checker ?
                        JSON.stringify({subject: subjects, count: count}) :
                        JSON.stringify({ids: ids}),
                });

                const data = await response.json();
                const processedData = processAssignments(data).map((assignment: Assignment) => ({
                    ...assignment,
                    hints:assignment.hints ?? [],
                }));

                setAssignments(processedData);
                setCorrectSolutions(new Array(processedData.length).fill(false));

            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };
        fetchAssignments();

    }, [auth.token]);

    const handleNextHint = () => {
        if (currentAssignmentIndex >= 0 && currentAssignmentIndex < assignments.length) {
            const currentAssignment: Assignment = assignments[currentAssignmentIndex];
            if (currentHintIndex < currentAssignment.hints.length - 1) {
                setCurrentHintIndex(currentHintIndex + 1);
            } else {
                setCurrentHintIndex(-1);
            }
        }
    };
    const submitSolution = () => {
        assignments[currentAssignmentIndex].submittedSolution = solution;
        const tmp=[...correctSolutions];
        const result = checkSolution(currentAssignment, solution);
        if (typeof result === "boolean") {
            tmp[currentAssignmentIndex] = result;
            if (result) {
                setCorrectSolutions((prev) => {
                    const newCorrectSolutions = [...prev];
                    newCorrectSolutions[currentAssignmentIndex] = true;
                    return newCorrectSolutions;
                });
            }
        }


        // tmp[currentAssignmentIndex]=checkSolution(currentAssignment, solution);
        // if (checkSolution(currentAssignment, solution))
        //     setCorrectSolutions((prev) => {
        //         const newCorrectSolutions = [...prev];
        //         newCorrectSolutions[currentAssignmentIndex] = true;
        //         return newCorrectSolutions;
        //     });
        setSolution("");
        setCurrentHintIndex(-1);

        if (assignments[currentAssignmentIndex + 1]) {
            setCurrentAssignmentIndex((prev) => prev + 1);
        } else {
            if (checker)storeData(tmp);
            const successRate= tmp.filter((x) => x).length/tmp.length*100;
            navigate("/result", {state: {successRate: successRate,assignments:assignments}});
        }
    };
    const storeData=async (tmp:boolean[])=>{
        const successRate= tmp.filter((x) => x).length/tmp.length*100;
        try {
            const response = await fetch('http://localhost:8000/api/test/', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({success_rate: successRate,themes:processAnswers(subjects,tmp,count)}),
            });
            console.log(response);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }

    }

    useEffect(() => {
        //console.log(correctSolutions);
    }, [correctSolutions]);


    return (
        <Block>
            <div className="container mx-auto">
                <div className="mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div
                            className="relative mx-auto max-w-[800px] overflow-hidden rounded-lg bg-card2 py-5 px-16 text-center sm:px-12 md:px-[60px]">
                            <div className="mb-10 text-center md:mb-16">
                                {currentAssignment ? (
                                    <div>
                                        <h1 className="text-3xl">Úloha: {currentAssignmentIndex + 1}:</h1>

                                        <p className={"text-2xl"}>{currentAssignment.task}</p>

                                        <div className="flex justify-center">
                                            <input
                                                type="text"
                                                id="solution"
                                                value={solution}
                                                autoComplete={"off"}
                                                onChange={(e) => setSolution(e.target.value)}
                                                className="border-[#E9EDF4]
                                            w-full
                                            mx-2
                                            my-5
                                            rounded-md
                                            border
                                            bg-card2
                                            py-3
                                            px-2
                                            text-base text-body-color
                                            outline-none
                                            focus:border-primary
                                            focus-visible:shadow-none"
                                            />
                                            <button onClick={submitSolution}
                                                    className="bg-background font-bold h-12 w-[10%] m-auto rounded"
                                            >{assignments[currentAssignmentIndex + 1] ? 'Ďalej' : 'Dokončiť'}
                                            </button>
                                        </div>


                                        {currentHintIndex === -1 ? (
                                            <p className="invisible">*</p>
                                        ) : (
                                            currentAssignment.hints && currentAssignment.hints.length > currentHintIndex ? (
                                                <p>{currentAssignment.hints[currentHintIndex].hint || "Skús to bez pomoci"}</p>
                                            ) : (
                                                <p>Skús to bez pomoci</p>
                                            )
                                        )}

                                        <button onClick={handleNextHint}
                                                className="bg-background font-bold py-2 px-4 rounded"
                                        >Nápoveda
                                        </button>


                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Block>
    );
}
