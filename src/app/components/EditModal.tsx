'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>;
  onSave: (updatedData: Record<string, any>) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  title,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Khi data thay đổi (hoặc mở modal), khởi tạo lại formData và xóa error
  useEffect(() => {
    if (data) {
      setFormData({ ...data });
      setErrors({});
    }
  }, [data]);

  // Xử lý khi thay đổi input
  const handleChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: '',
      });
    }
  };

  // Kiểm tra tính hợp lệ trước khi lưu
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'id') return;
      if (key === 'orders' || key === 'spent') return;

      // Bắt buộc nhập
      if (value === '' || value === null || value === undefined) {
        newErrors[key] = 'Cannot be left blank';
        isValid = false;
      }

      // Email phải đúng định dạng
      if (key === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) {
          newErrors[key] = 'Email invalid';
          isValid = false;
        }
      }

      // Các trường price/total/spent phải bắt đầu bằng $
      if (
        (key === 'price' || key === 'total') &&
        value
      ) {
        if (typeof value === 'string' && !value.startsWith('$')) {
          newErrors[key] = 'Must start with the character $';
          isValid = false;
        }
      }

      // Stock phải là số
      if (key === 'stock' && value) {
        if (isNaN(Number(value))) {
          newErrors[key] = 'Must be a number';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const updated = { ...formData, id: data.id };
      onSave(updated);
      onClose();
    }
  };

  // Chuẩn hóa nhãn từ key
  const formatKey = (key: string): string => {
    if (key === 'id') return '';
    let formatted = key.replace(/_/g, ' ');
    formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');
    return formatted
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Xác định type của input
  const getInputType = (key: string): string => {
    if (key === 'email') return 'email';
    if (key.toLowerCase().includes('date')) return 'date';
    if (key === 'stock') return 'number';
    return 'text';
  };

  // Lọc ra các trường ngoại trừ `id`
  const editableFields = Object.entries(formData).filter(
    ([key]) => key !== 'id' && key !== 'orders' && key !== 'spent'
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <DialogHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Update the information and then click 'Save' to confirm.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {editableFields.map(([key, value]) => {
              if (key === 'status') {
                return (
                  <div key={key} className="col-span-1">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {formatKey(key)}
                    </label>
                    <select
                      id={key}
                      name={key}
                      value={formData[key] as string}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm leading-5 text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {typeof value === 'string' &&
                        value.toLowerCase().includes('stock') && (
                          <>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                          </>
                        )}

                      {typeof value === 'string' &&
                        ['completed', 'processing', 'pending', 'cancelled'].includes(
                          (value as string).toLowerCase()
                        ) && (
                          <>
                            <option value="completed">Completed</option>
                            <option value="processing">Processing</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                          </>
                        )}

                      {typeof value === 'string' &&
                        ['active', 'inactive'].includes(
                          (value as string).toLowerCase()
                        ) && (
                          <>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </>
                        )}
                    </select>
                    {errors[key] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[key]}
                      </p>
                    )}
                  </div>
                );
              }

              return (
                <div key={key} className="col-span-1">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {formatKey(key)}
                  </label>
                  <input
                    type={getInputType(key)}
                    id={key}
                    name={key}
                    value={formData[key] as string}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm leading-5 text-gray-700 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors[key] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[key]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <DialogFooter className="flex flex-col sm:flex-row-reverse items-stretch gap-2 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Button
              type="submit"
              variant="default"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-300"
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
