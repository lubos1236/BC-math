import Block from "../components/Block.tsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider.tsx";
import PaginatedTable from "../components/PaginatedTable.tsx";
import { Assignment, processAssignments } from "../utils/assignmentUtils.ts";
import MarkdownComponent from "../components/MarkdownComponent.tsx";
import HintModal from "../components/HintModal.tsx";

export default function Assignments() {
    const [data, setData] = useState<Assignment[]>([]);
    const [editItem, setEditItem] = useState<Assignment | null>(null);
    const [generatedTask, setGeneratedTask] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const auth = useContext(AuthContext);
    const [selectedHints, setSelectedHints] = useState<number[]>([]);

    useEffect(() => {
        fetchData();
    }, [auth.token]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/assignments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            setData(await response.json());
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    const handleEdit = (item: Assignment) => {
        const cloned = structuredClone(item);
        setEditItem(cloned);


        if (cloned.hints) {
            setSelectedHints(cloned.hints.map(hint => hint.id));
        } else {
            setSelectedHints([]);
        }

        setShowModal(true);
        setGeneratedTask('');
    };

    useEffect(() => {
        if (showModal && editItem && generatedTask === '') {

            handleGenerate();
        }
    }, [showModal, editItem]);

    const handleGenerate = () => {
        if (!editItem) return;


        const processed = processAssignments([structuredClone(editItem)]);
        setGeneratedTask(processed[0].task);
    };

    const handleNew = () => {
        const emptyAssignment: Assignment = {
            id: 0,
            subject_id: 1,
            task: '',
            variables: '',
            solution: '',
        };
        setEditItem(emptyAssignment);
        setGeneratedTask('');
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!editItem) return;


        const payload = {
            ...editItem,
            hint_ids: selectedHints,
        };

        const method = editItem.id === 0 ? 'POST' : 'PUT';
        const url = editItem.id === 0
            ? 'http://localhost:8000/api/assignments/create'
            : 'http://localhost:8000/api/assignments/edit';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                await fetchData();
                setShowModal(false);
                setEditItem(null);
                setGeneratedTask('');
                setSelectedHints([]);
            } else {
                console.error('Failed to save assignment');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleDelete = async (item: Assignment) => {
        try {
            const response = await fetch(`http://localhost:8000/api/assignments/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete assignment');
            }
            setData((prev) => prev.filter((assignment) => assignment.id !== item.id));
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    return (
        <Block>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Úlohy</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleNew}
                            className="bg-blue-600 text-light-text dark:text-dark-text px-4 py-2 rounded hover:bg-blue-700"
                        >
                            +
                        </button>
                        <a
                            href="/navod"
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Návod
                        </a>
                    </div>
                </div>
                <div className="overflow-x-auto w-full">
                    <PaginatedTable
                        data={data}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Id témy', accessor: 'subject_id' },
                            { header: 'Úloha', accessor: 'task' },
                        ]}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            {showModal && editItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-light-background dark:bg-dark-background p-6 rounded-xl shadow-lg w-[900px] max-w-full">
                        <h2 className="text-xl font-bold mb-4">Upraviť/Vytvoriť </h2>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block font-semibold mb-1">Id témy:</label>
                                <input
                                    type="number"
                                    value={editItem.subject_id}
                                    onChange={(e) => setEditItem({ ...editItem, subject_id: parseInt(e.target.value) })}
                                    className="w-full border p-2 rounded bg-light-background dark:bg-dark-background"
                                />
                            </div>
                        </div>

                        <div className="flex gap-6 mb-6">
                            <div className="w-1/2">
                                <label className="block font-semibold mb-1">Úloha:</label>
                                <textarea
                                    value={editItem.task}
                                    onChange={(e) => setEditItem({ ...editItem, task: e.target.value })}
                                    className="w-full h-64 p-2 border rounded resize-none bg-light-background dark:bg-dark-background"
                                />
                            </div>

                            <div className="w-1/2">
                                <label className="block font-semibold mb-1">Náhľad:</label>
                                <div className="w-full h-64 p-2 border rounded overflow-auto whitespace-pre-wrap">
                                    <MarkdownComponent markDown={generatedTask} />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block font-semibold mb-1">Premenné:</label>
                            <textarea
                                value={editItem.variables}
                                onChange={(e) => setEditItem({ ...editItem, variables: e.target.value })}
                                className="w-full h-32 p-2 border rounded resize-none font-mono text-sm bg-light-background dark:bg-dark-background"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block font-semibold mb-1">Výpočet:</label>
                            <textarea
                                value={editItem.solution}
                                onChange={(e) => setEditItem({ ...editItem, solution: e.target.value })}
                                className="w-full h-40 p-2 border rounded resize-none font-mono text-sm bg-light-background dark:bg-dark-background"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleGenerate}
                                className="px-4 py-2 bg-green-800 rounded"
                            >
                                Generovať
                            </button>
                            <button
                                onClick={() => setShowHelpModal(true)}
                                className="px-4 py-2 border rounded"
                            >
                                Nápoveda
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditItem(null);
                                    setGeneratedTask('');
                                }}
                                className="px-4 py-2 border rounded"
                            >
                                Zrušiť
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-light-text dark:text-dark-text rounded"
                            >
                                Uložiť
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showHelpModal && (
                <HintModal
                    isOpen={showHelpModal}
                    onClose={() => setShowHelpModal(false)}
                    selectedHintIds={selectedHints}
                    onSave={(ids) => setSelectedHints(ids)}
                />
            )}
        </Block>
    );
}
