import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider.tsx";

interface Hint {
    id: number;
    hint: string;
}

interface HintModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedHintIds: number[];
    onSave: (selectedIds: number[]) => void;
}

const HintModal: React.FC<HintModalProps> = ({ isOpen, onClose, selectedHintIds, onSave }) => {
    const [hints, setHints] = useState<Hint[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>(selectedHintIds);
    const [newHint, setNewHint] = useState("");
    const [editHint, setEditHint] = useState<Hint | null>(null);
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (!isOpen) return;
        setSelectedIds(selectedHintIds);
        fetchData();
    }, [isOpen, selectedHintIds]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/hints', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            setHints(await response.json());
        } catch (error) {
            console.error('Error fetching hints:', error);
        }
    };

    const toggleHint = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
        );
    };

    const handleCreateHint = async () => {
        if (!newHint.trim()) return;

        await fetch('http://localhost:8000/api/hints', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ hint: newHint }),
        })
            .then(res => res.json())
            .then((created: Hint) => {
                setHints(prev => [...prev, created]);
                setSelectedIds(prev => [...prev, created.id]);
                setNewHint("");
            });
    };

    const handleSave = () => {
        onSave(selectedIds);
        onClose();
    };

    const handleEdit = (hint: Hint) => {
        setEditHint(hint);
        setNewHint(hint.hint); // Prednastavi text do inputu pre editáciu
    };

    const handleUpdateHint = async () => {
        if (!newHint.trim() || !editHint) return;

        await fetch(`http://localhost:8000/api/hints/${editHint.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ hint: newHint }),
        })
            .then(res => res.json())
            .then((updated: Hint) => {
                setHints(prev => prev.map(h => (h.id === updated.id ? updated : h)));
                setNewHint("");
                setEditHint(null); // Zrušiť režim úpravy
            });
    };

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8000/api/hints/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
        })
            .then(() => {
                setHints(prev => prev.filter(h => h.id !== id));
            });
    };

    const handleCancelEdit = () => {
        setEditHint(null); // Zrušiť režim úpravy
        setNewHint(""); // Resetovať vstup na prázdny
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className="bg-light-background dark:bg-dark-background rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Priradiť nápovedy</h2>

                <div className="space-y-2 mb-4">
                    {hints.map(hint => (
                        <div key={hint.id} className="flex justify-between items-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(hint.id)}
                                    onChange={() => toggleHint(hint.id)}
                                />
                                <span>{hint.hint}</span>
                            </label>

                            <div className="flex space-x-2">
                                <button
                                    className="text-blue-500"
                                    onClick={() => handleEdit(hint)}
                                >
                                    Upravit
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(hint.id)}
                                >
                                    Zmazať
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        className="border p-2 rounded w-full bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                        placeholder={editHint ? "Upravit nápovedu" : "Nová nápoveda"}
                        value={newHint}
                        onChange={e => setNewHint(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={editHint ? handleUpdateHint : handleCreateHint}
                    >
                        {editHint ? "Upravit" : "Pridať"}
                    </button>
                </div>

                <div className="flex justify-end gap-2">
                    {editHint && (
                        <button
                            className="px-4 py-2 rounded border"
                            onClick={handleCancelEdit}
                        >
                            Prejsť na výtvarianie
                        </button>
                    )}
                    <button
                        className="px-4 py-2 rounded border"
                        onClick={onClose}
                    >
                        Zrušiť
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        Potvrdiť
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HintModal;
