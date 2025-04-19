import Block from "../components/Block.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../components/AuthProvider.tsx";
import PaginatedTable from "../components/PaginatedTable.tsx";
import {Assignment} from "../utils/assignmentUtils.ts";

export default function Assignments() {
    const [data, setData] = useState<Assignment[]>([]);
    const [editItem, setEditItem] = useState<Assignment | null>(null);
    const [showModal, setShowModal] = useState(false);
    const auth = useContext(AuthContext);


    useEffect(() => {
        fetchData();

    }, [auth.token]);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

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
        setEditItem(item);
        setShowModal(true);
    }
    const handleSave = async () => {
        if (!editItem) return;

        try {
            const response = await fetch(`http://localhost:8000/api/assignments/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(editItem),
            });
            if (response.ok) {
                await fetchData();
                setShowModal(false);
                setEditItem(null);
            } else {
                console.error('Failed to update assignment');
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
            console.error('Error deleting user:', error);
        }
    }




    return (
        <Block>
            <div className="p-4">
                <h1 className="text-2xl mb-4">Assignments </h1>
                <PaginatedTable data={data}
                                columns={[
                                    {header: 'ID', accessor: 'id'},
                                    {header: 'Subject Id', accessor: 'subject_id'},
                                    {header: 'Task', accessor: 'task'},
                                ]}
                                onEdit={(item) => handleEdit(item)}
                                onDelete={(item) => handleDelete(item)}
                                />
            </div>
            {showModal && editItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-background p-6 rounded-xl shadow-lg w-[800px] max-w-full">
                        <h2 className="text-xl font-bold mb-4">Edit Assignment</h2>

                        {/* ID + Subject ID */}
                        <div className="grid grid-cols-2 gap-4 mb-6">

                            <div>
                                <label className="block font-semibold mb-1">Subject ID:</label>
                                <input
                                    type="number"
                                    value={editItem.subject_id}
                                    onChange={(e) => setEditItem({...editItem, subject_id: parseInt(e.target.value)})}
                                    className="w-full border p-2 rounded bg-background"
                                />
                            </div>
                        </div>

                        {/* Task Edit + Preview */}
                        <div className="flex gap-6">
                            {/* LEFT: Edit Task */}
                            <div className="w-1/2">
                                <label className="block font-semibold mb-1">Edit Task:</label>
                                <textarea
                                    value={editItem.task}
                                    onChange={(e) => setEditItem({...editItem, task: e.target.value})}
                                    className="w-full h-64 p-2 border rounded resize-none bg-background"
                                />
                            </div>

                            {/* RIGHT: Preview */}
                            <div className="w-1/2">
                                <label className="block font-semibold mb-1">Task Preview:</label>
                                <div className="w-full h-64 p-2 border rounded overflow-auto bg-card whitespace-pre-wrap">
                                    {editItem.task}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditItem(null);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </Block>
    );
}
