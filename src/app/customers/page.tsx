"use client";

import React, { useEffect, useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Menu,
  X,
  Bell,
  Settings,
  Package,
  Download
} from 'lucide-react';
import DetailModal from '../components/DetailModal';
import EditModal from '../components/EditModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { StatusBadge } from '../components/StatusBadge';
import Sidebar from '../components/Sidebar';
import initialCustomers from '@/data/customers.json';

const Customers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Customers');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customersState, setCustomersState] = useState<any[]>([]);

  useEffect(() => {
    setCustomersState(initialCustomers);
  }, []);

  // Function to handle view button click
  const handleViewClick = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };
  // Function to handle edit button click
  const handleEditClick = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  // Function to handle delete button click
  const handleDeleteClick = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  // Function to handle save in edit modal
  // const handleSaveEdit = (updatedCustomer: any) => {
  //   setCustomers(customers.map(customer => 
  //     customer.id === updatedCustomer.id ? updatedCustomer : customer
  //   ));
  //   setIsEditModalOpen(false);
  // };
  const handleSaveEdit = (updatedCustomer: any) => {
    setCustomersState((prev) =>
      prev.map((c) =>
        c.id === updatedCustomer.id ? updatedCustomer : c
      )
    );
    setIsEditModalOpen(false);
  };

  // Function to handle confirm in delete modal
  // const handleConfirmDelete = () => {
  //   setCustomers(customers.filter(customer => customer.id !== selectedCustomer.id));
  //   setIsDeleteModalOpen(false);
  // };
  const handleConfirmDelete = () => {
    if (!selectedCustomer) return;
    setCustomersState((prev) =>
      prev.filter((c) => c.id !== selectedCustomer.id)
    );
    setIsDeleteModalOpen(false);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activePage="customers"
      /> */}

      {/* Main Content */}
      <div className="lg:ml-64 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customers</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Customers Content */}
        <main className="p-4 sm:p-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700">Filter</span>
                </button>
              </div>
              <div className="relative">
                <button
                  onClick={() => setSelectedStatus(selectedStatus === 'All Customers' ? 'Active' : 'All Customers')}
                  className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm text-gray-700 mr-2">{selectedStatus}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              <span className="text-sm">Export</span>
            </button>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customersState.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-sm">
                              {customer.name
                                .split(' ')
                                .map((n: string) => n[0])
                                .join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-500">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{customer.location}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{customer.orders}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{customer.spent}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={customer.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            onClick={() => handleViewClick(customer)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            onClick={() => handleEditClick(customer)}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            onClick={() => handleDeleteClick(customer)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{customersState.length}</span> of <span className="font-medium">{customersState.length}</span> customers
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedCustomer && (
        <DetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Customer Details: ${selectedCustomer.name}`}
          data={selectedCustomer}
        />
      )}

      {/* Edit Modal */}
      {selectedCustomer && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit Customer: ${selectedCustomer.name}`}
          data={selectedCustomer}
          onSave={handleSaveEdit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {selectedCustomer && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete customer"
          itemName={selectedCustomer.name}
          itemType="Customer"
        />
      )}
    </div>
  );
};

export default Customers;
