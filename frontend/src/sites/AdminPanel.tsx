import Block from "../components/Block.tsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext, User} from "../components/AuthProvider.tsx";
import PaginatedTable from "../components/PaginatedTable.tsx";
import {Role} from "../utils/Role.tsx";

export default function AdminPanel() {
    const [data, setData] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const auth = useContext(AuthContext);

    const handleEdit = (item: User) => {
        setEditingUser({...item});
    }

    const handleDelete = async (item: User) => {
        try {
            const response = await fetch('http://localhost:8000/api/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({id: item.id}),
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setData((prev) => prev.filter((user) => user.id !== item.id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    const handleSave = async () => {
        if (!editingUser) return;

        try {
            const response = await fetch('http://localhost:8000/api/users/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({user: editingUser}),
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            await fetchUsers();
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            setData(await response.json());
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {

        fetchUsers();
    }, [auth.token]);

    return (
        <Block>
            <div className="p-4">
                <h1 className="text-2xl mb-4 sm:text-xl md:text-2xl lg:text-3xl">Užívatelia</h1>
                <div className="overflow-x-auto w-full">
                    <PaginatedTable<User>
                        data={data}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Meno', accessor: 'name' },
                            { header: 'Email', accessor: 'email' },
                            { header: 'Rola', accessor: 'role' },
                        ]}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
                    <div className="bg-light-background dark:bg-dark-background p-6 rounded shadow-lg w-full sm:w-80 md:w-96 lg:w-1/3 xl:w-1/4 space-y-4">
                        <h2 className="text-xl font-bold sm:text-lg md:text-xl lg:text-2xl">Upraviť úžívateľa</h2>

                        <div>
                            <label className="block mb-1">Meno:</label>
                            <input
                                className="w-full border  p-2 rounded bg-light-background dark:bg-dark-background"
                                value={editingUser.name}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, name: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Email:</label>
                            <input
                                className="w-full border  p-2 rounded bg-light-background dark:bg-dark-background"
                                value={editingUser.email}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, email: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Rola:</label>
                            <select
                                className="w-full border  p-2 rounded bg-light-background dark:bg-dark-background"
                                value={editingUser.role}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, role: e.target.value as Role })
                                }
                            >
                                <option value="Student">Student</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-light-card dark:bg-dark-card rounded "
                                onClick={() => setEditingUser(null)}
                            >
                                Zrušiť
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-light-text dark:text-dark-text rounded"
                                onClick={handleSave}
                            >
                                Uložiť
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Block>
    );

}
