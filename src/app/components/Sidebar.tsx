"use client";

import React from 'react';
import { TrendingUp, Package, X, ShoppingCart, Users, House } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activePage: 'dashboard' | 'products' | 'orders' | 'customers' | 'analytics';
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activePage
}) => {
  return (
    <div className={`fixed left-0 top-0 w-64 h-full bg-white shadow-lg border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block`}>
      <div className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Your Company</span>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-8">
        <div className="px-6">
          <Link
            href="/"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${activePage === 'dashboard'
              ? 'text-blue-600 bg-blue-50 font-medium'
              : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <House className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
        </div>
        <div className="mt-2 px-6 space-y-1">
          <Link
            href="/products"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${activePage === 'products'
              ? 'text-blue-600 bg-blue-50 font-medium'
              : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Package className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link
            href="/orders"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${activePage === 'orders'
              ? 'text-blue-600 bg-blue-50 font-medium'
              : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <ShoppingCart size={24} className='h-5 w-5 mr-3' />
            Orders
          </Link>
          <Link
            href="/customers"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${activePage === 'customers'
              ? 'text-blue-600 bg-blue-50 font-medium'
              : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Users size={24} className='h-5 w-5 mr-3' />
            Customers
          </Link>
          <Link
            href="/analytics"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${activePage === 'analytics'
              ? 'text-blue-600 bg-blue-50 font-medium'
              : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <TrendingUp className='h-5 w-5 mr-3' />
            Analytics
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
