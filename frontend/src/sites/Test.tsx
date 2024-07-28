import {Fragment, SetStateAction, useContext, useEffect, useState} from "react";
import {AuthContext} from "../components/AuthProvider.tsx";
import {useNavigate, useLocation} from "react-router-dom";
import {processAssignments, checkSolution, Assignment} from "../utils/assignmentUtils.ts";



export default function Test() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [currentAssignmentIndex, setCurrentAssignmentIndex] = useState(0);
    const [solution, setSolution] = useState("");
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.fromPage||"unknown";
    useEffect(() => {
        const fetchAssignments = async () => {
            let ids = {};
            switch (fromPage) {
                case "Page1":ids = {ids: [2]};break;
                case "Page2":ids = {ids: [1]};break;
                case "Page3":ids = {ids: [1]};break;
                case "Page4":ids = {ids: [1]};break;
                case "Home":ids = {ids: [2]};break;
            }
            try {
                const response = await fetch('http://localhost:8000/api/assignments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify(ids),
                });
                const data = await response.json();
                const processedData = processAssignments(data);
                setAssignments(processedData);
                console.log(processedData);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };
        fetchAssignments();

    }, []);

    const handleNextAssignment = () => {
        assignments[currentAssignmentIndex].submittedSolution = solution;
        console.log(checkSolution(assignments[currentAssignmentIndex], solution));
        setCurrentAssignmentIndex((prevIndex) => prevIndex + 1);
        setSolution("");
        if (currentAssignmentIndex === assignments.length - 1) {
            navigate("/");
        }
    };

    const currentAssignment:Assignment = assignments[currentAssignmentIndex];

    const handleSolutionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSolution(e.target.value);
    };


    return (
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
            <div className="container mx-auto">
                <div className="mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="
                        relative
                        mx-auto
                        max-w-[525px]
                        overflow-hidden
                        rounded-lg
                        bg-white
                        py-5
                        px-16
                        text-center
                        sm:px-12
                        md:px-[60px]
                        ">


                            <div className="mb-10 text-center md:mb-16">
                                {currentAssignment ? (
                                    <div>
                                        <h1>Rieš úlohu: {currentAssignmentIndex+1}:</h1>
                                        {/*<p>ID: {currentAssignment.id}</p>*/}
                                        {/*<p>Subject ID: {currentAssignment.subject_id}</p>*/}

                                        <p className={"text-2xl"}>Task: {currentAssignment.task}</p>
                                        {/*<p>Variables: {currentAssignment.variables}</p>*/}
                                        <label htmlFor="solution">Solution:</label>
                                        <input
                                            type="text"
                                            id="solution"
                                            value={solution}
                                            onChange={handleSolutionChange}
                                        />
                                        <button
                                            onClick={handleNextAssignment}>{assignments[currentAssignmentIndex + 1] ?
                                            (<Fragment>NEXT</Fragment>) : (<Fragment>Home</Fragment>)}</button>
                                    </div>
                                ) : (
                                    // <p>No assignments available</p>
                                    <p>Loading...</p>
                                )}
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </section>

    )
}
