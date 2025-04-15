// File: /client/common/Card.js
import React from 'react';

/**
 * Reusable Card component for wrapping content 
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Content to be displayed within the card
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Optional card title
 * @param {boolean} props.noPadding - If true, removes default padding
 */
const Card = ({ children, className = '', title, noPadding = false }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
      )}
      <div className={noPadding ? '' : 'p-4'}>
        {children}
      </div>
    </div>
  );
};

export default Card;