import Block from "../components/Block.tsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider.tsx";
import PaginatedTable from "../components/PaginatedTable.tsx";
import LatexComponent from "../components/LatexComponent.tsx";
import { Theme } from "./Home.tsx";

export default function Themes() {
    const [data, setData] = useState<Theme[]>([]);
    const [editItem, setEditItem] = useState<Theme | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false); // New state for create modal
    const [newTheme, setNewTheme] = useState<Theme>({ id: 0, title: '', text: '' }); // New state for new theme
    const auth = useContext(AuthContext);

    useEffect(() => {
        fetchData();
    }, [auth.token]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/theme', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            const themes = await response.json();
            setData(themes);
        } catch (error) {
            console.error('Error fetching themes:', error);
        }
    };

    const handleEdit = (item: Theme) => {
        setEditItem(item);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!editItem) return;
        try {
            const response = await fetch(`http://localhost:8000/api/theme/edit`, {
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
                console.error('Failed to update theme');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleDelete = async (item: Theme) => {
        try {
            const response = await fetch(`http://localhost:8000/api/theme/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            if (response.ok) {
                setData((prev) => prev.filter((theme) => theme.id !== item.id));
            } else {
                console.error('Failed to delete theme');
            }
        } catch (error) {
            console.error('Error deleting theme:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/theme/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(newTheme),
            });
            if (response.ok) {
                await fetchData();
                setShowCreateModal(false);
                setNewTheme({ id: 0, title: '', text: '' }); // Reset new theme state
            } else {
                console.error('Failed to create theme');
            }
        } catch (err) {
            console.error('Error creating theme:', err);
        }
    };

    return (
        <Block>
            <div className="p-4">
                <h1 className="text-2xl mb-4">Themes</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="mb-4 px-4 py-2 bg-green-500 text-light-text dark:text-dark-text rounded"
                >
                    +
                </button>
                <PaginatedTable
                    data={data}
                    columns={[
                        { header: 'ID', accessor: 'id' },
                        { header: 'Názov', accessor: 'title' },
                    ]}
                    onEdit={(item) => handleEdit(item)}
                    onDelete={(item) => handleDelete(item)}
                />
            </div>

            {/* Modal for editing theme */}
            {showModal && editItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-light-background dark:bg-dark-background p-6 rounded-xl shadow-lg w-[1200px] h-[800px] max-w-full flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Upraviť</h2>

                        <div className="mb-6">
                            <label className="block font-semibold mb-2">Názov:</label>
                            <input
                                type="text"
                                value={editItem.title}
                                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                                className="w-full p-2 border rounded bg-light-background dark:bg-dark-background"
                            />
                        </div>

                        <div className="flex gap-6 mb-6 h-[500px] ">
                            <div className="w-1/2">
                                <label className="block font-semibold mb-2">Text</label>
                                <textarea
                                    value={editItem.text}
                                    onChange={(e) => setEditItem({ ...editItem, text: e.target.value })}
                                    className="w-full h-full p-2 border rounded resize-none bg-light-background dark:bg-dark-background"
                                />
                            </div>

                            <div className="w-1/2">
                                <label className="block font-semibold mb-2">Náhľad:</label>
                                <div className="w-full h-full p-2 border rounded overflow-auto bg-light-background dark:bg-dark-background whitespace-pre-wrap">
                                    <LatexComponent markDown={editItem.text} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditItem(null);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded"
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

            {/* Modal for creating new theme */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-light-background dark:bg-dark-background p-6 rounded-xl shadow-lg w-[600px] max-w-full flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Create New Theme</h2>

                        <div className="mb-6">
                            <label className="block font-semibold mb-2">Theme Title:</label>
                            <input
                                type="text"
                                value={newTheme.title}
                                onChange={(e) => setNewTheme({ ...newTheme, title: e.target.value })}
                                className="w-full p-2 border rounded bg-light-background dark:bg-dark-background"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block font-semibold mb-2">Theme Text:</label>
                            <textarea
                                value={newTheme.text}
                                onChange={(e) => setNewTheme({ ...newTheme, text: e.target.value })}
                                className="w-full p-2 border rounded resize-none bg-light-background dark:bg-dark-background"
                            />
                        </div>

                        <div className="mt-auto flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setNewTheme({ id: 0, title: '', text: '' }); // Reset new theme state
                                }}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 bg-green-500 text-light-text dark:text-dark-text rounded"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Block>
    );
}
