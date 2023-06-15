export function TableHead({
  tableHeadTransaction,
}: {
  tableHeadTransaction: string[];
}) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableHeadTransaction.map((tableName, index) => {
          return (
            <th
              key={index}
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              {tableName}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
