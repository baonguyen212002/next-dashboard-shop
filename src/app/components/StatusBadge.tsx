'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    const lower = status.toLowerCase();
    if (['active', 'in stock', 'complete', 'completed'].includes(lower)) {
      return 'bg-green-100 text-green-800';
    }
    if (['processing'].includes(lower)) {
      return 'bg-blue-100 text-blue-800';
    }
    if (['pending', 'low stock'].includes(lower)) {
      return 'bg-yellow-100 text-yellow-800';
    }
    if (['cancelled', 'inactive', 'out of stock'].includes(lower)) {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};
