import { useState } from "react";

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
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <div className="p-4">
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="bg-light-background dark:bg-dark-background">
                    {columns.map((col) => (
                        <th key={String(col.accessor)} className="p-2 border text-left">
                            {col.header}
                        </th>
                    ))}
                    {(onEdit || onDelete) && <th className="p-2 border">Akcie</th>}
                </tr>
                </thead>
                <tbody>
                {currentRows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        {columns.map((col) => (
                            <td
                                key={String(col.accessor)}
                                className="p-2 border max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
                            >
                                    <span title={String(row[col.accessor])}>
                                        {String(row[col.accessor])}
                                    </span>
                            </td>
                        ))}
                        {(onEdit || onDelete) && (
                            <td className="p-2 border text-center">
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(row)}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Editovať
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(row)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Zmazať
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>


            <div className="mt-4 flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="rowsPerPage" className="text-sm">Riadkov na stránku:</label>
                    <select
                        id="rowsPerPage"
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        className="border p-1 rounded bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                    >
                        Predchádzajúca
                    </button>
                    <span>
                        Stránka {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                    >
                        Ďalšia
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaginatedTable;
