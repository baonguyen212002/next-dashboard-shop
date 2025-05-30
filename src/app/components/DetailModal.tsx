'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { StatusBadge } from '../components/StatusBadge';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  title,
  data,
}) => {
  const formatValue = (key: string, value: any): string => {
    if (value === null || value === undefined) return '-';

    if (key.toLowerCase().includes('date') && typeof value === 'string') {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      } catch (e) { }
    }

    if (typeof value === 'string' && value.startsWith('$')) {
      return value;
    }

    return String(value);
  };

  const formatKey = (key: string): string => {
    let formatted = key.replace(/_/g, ' ');
    formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');
    return formatted
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const displayableFields = Object.entries(data).filter(([key]) => {
    const lowercaseKey = key.toLowerCase();
    return (
      !lowercaseKey.includes('id') &&
      !lowercaseKey.includes('_id') &&
      !lowercaseKey.includes('uuid') &&
      key !== 'id'
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center w-full">
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            See detailed information below.
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-lg overflow-hidden mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {displayableFields.map(([key, value]) => (
                <tr key={key}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 w-1/3">
                    {formatKey(key)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {key.toLowerCase() === 'status' ? (
                      <StatusBadge status={value} />
                    ) : (
                      formatValue(key, value)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
