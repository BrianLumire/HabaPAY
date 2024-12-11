const TableRecent = ({ 
    columns,      
    renderRow,
    data
}: {
    columns: { header: string; accessor: string; icon?: string }[];
    renderRow: (item: any) => React.ReactNode;
    data: any[];
}) => {
    return (
        <div className="overflow-x-auto">  {/* Makes the table scrollable horizontally */}
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor} className="py-4 text-sm sm:text-base">
                                <div className="flex items-center space-x-2">
                                    <span>{col.header}</span>
                                    {col.icon && <img src={col.icon} alt={`${col.header} icon`} className="w-4 h-4" />}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => renderRow(item))}
                </tbody>
            </table>
        </div>
    );
};

export default TableRecent;
