// File: /client/common/Table.js
import React from 'react';

/**
 * Reusable Table component to display tabular data
 *
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions
 * @param {Array} props.data - Array of data objects
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.striped - Whether to apply striped rows
 * @param {boolean} props.hoverable - Whether to apply hover effect
 * @param {string} props.emptyMessage - Message to display when data is empty
 */
const Table = ({
  columns,
  data,
  className = '',
  striped = true,
  hoverable = true,
  emptyMessage = 'No data available'
}) => {
  // If no data, display empty message
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`
                ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
                ${hoverable ? 'hover:bg-gray-100' : ''}
              `}
            >
              {columns.map((column, colIndex) => {
                const cellValue = row[column.accessor];
                
                return (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${column.className || ''}`}
                  >
                    {column.cell ? column.cell(cellValue, row) : cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;