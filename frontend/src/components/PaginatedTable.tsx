import {useState} from "react";

interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface PaginatedTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

export function PaginatedTable<T extends { id: number }>({
                                                             data,
                                                             columns,
                                                             onEdit,
                                                             onDelete,
                                                         }: PaginatedTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    function truncate(text: string, maxLength = 40): string {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength - 3) + '...';
    }


    return (
        <div className="p-4">
            <table className="w-full border">
                <thead>
                <tr className="bg-background">
                    {columns.map((col) => (
                        <th key={String(col.accessor)} className="p-2 border">{col.header}</th>
                    ))}
                    {(onEdit || onDelete) && <th className="p-2 border">Actions</th>}
                </tr>
                </thead>
                <tbody>
                {currentRows.map((row) => (
                    <tr key={row.id}>
                        {columns.map((col) => (
                            <td key={String(col.accessor)} className="p-2 border">
                                {typeof row[col.accessor] === 'string'
                                    ? truncate(row[col.accessor] as string)
                                    : String(row[col.accessor])}
                            </td>
                        ))}
                        {(onEdit || onDelete) && (
                            <td className="p-2 border">
                                {onEdit && (
                                    <button onClick={() => onEdit(row)} className="text-blue-500 hover:underline mr-2">
                                        Edit
                                    </button>
                                )}
                                {onDelete && (
                                    <button onClick={() => onDelete(row)} className="text-red-500 hover:underline">
                                        Delete
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center gap-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
export default PaginatedTable;
