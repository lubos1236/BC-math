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
                <h1 className="text-2xl mb-4">User Table</h1>
                <PaginatedTable<User>
                    data={data}
                    columns={[
                        {header: 'ID', accessor: 'id'},
                        {header: 'Name', accessor: 'name'},
                        {header: 'Email', accessor: 'email'},
                        {header: 'Role', accessor: 'role'},
                    ]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-background p-6 rounded shadow-lg w-96 space-y-4">
                        <h2 className="text-xl font-bold">Edit User</h2>

                        <div>
                            <label className="block mb-1">Name:</label>
                            <input
                                className="w-full border p-2 rounded bg-background"
                                value={editingUser.name}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, name: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Email:</label>
                            <input
                                className="w-full border p-2 rounded bg-background"
                                value={editingUser.email}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, email: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Role:</label>
                            <select
                                className="w-full border p-2 rounded bg-background"
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
                                className="px-4 py-2 bg-card rounded "
                                onClick={() => setEditingUser(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleSave}
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
